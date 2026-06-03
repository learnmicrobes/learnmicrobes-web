import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export type BookmarkItemType = 'learn' | 'visual';

export type BookmarkRow = {
  id: string;
  user_id: string;
  item_type: BookmarkItemType;
  item_slug: string;
  item_title: string;
  item_path: string;
  item_summary: string | null;
  created_at: string;
};

export type BookmarkInput = {
  itemType: BookmarkItemType;
  itemSlug: string;
  itemTitle: string;
  itemPath: string;
  itemSummary?: string | null;
};

const isMissingBookmarksTableError = (message: string) => (
  message.toLowerCase().includes('bookmarks') && (
    message.toLowerCase().includes('does not exist') ||
    message.toLowerCase().includes('schema cache') ||
    message.toLowerCase().includes('relation')
  )
);

const getBookmarkErrorMessage = (message: string) => (
  isMissingBookmarksTableError(message)
    ? 'Bookmark storage is not created yet. Run the bookmarks SQL in Supabase, then refresh this page.'
    : message
);

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([]);
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(false);
  const [bookmarkError, setBookmarkError] = useState('');

  const loadBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      setBookmarkError('');
      return;
    }

    if (!supabase) {
      setBookmarkError('Supabase is not configured yet.');
      return;
    }

    setIsLoadingBookmarks(true);
    setBookmarkError('');

    const { data, error } = await supabase
      .from('bookmarks')
      .select('id, user_id, item_type, item_slug, item_title, item_path, item_summary, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setIsLoadingBookmarks(false);

    if (error) {
      setBookmarkError(getBookmarkErrorMessage(error.message));
      return;
    }

    setBookmarks((data ?? []) as BookmarkRow[]);
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!isMounted) {
        return;
      }

      await loadBookmarks();
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [loadBookmarks]);

  const bookmarkKeys = useMemo(() => (
    new Set(bookmarks.map((bookmark) => `${bookmark.item_type}:${bookmark.item_slug}`))
  ), [bookmarks]);

  const isBookmarked = useCallback((itemType: BookmarkItemType, itemSlug: string) => (
    bookmarkKeys.has(`${itemType}:${itemSlug}`)
  ), [bookmarkKeys]);

  const toggleBookmark = useCallback(async (bookmark: BookmarkInput) => {
    if (!user) {
      return {
        ok: false,
        action: 'none' as const,
        message: 'Sign in to save bookmarks.'
      };
    }

    if (!supabase) {
      return {
        ok: false,
        action: 'none' as const,
        message: 'Supabase is not configured yet.'
      };
    }

    const currentlyBookmarked = isBookmarked(bookmark.itemType, bookmark.itemSlug);
    setBookmarkError('');

    if (currentlyBookmarked) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('item_type', bookmark.itemType)
        .eq('item_slug', bookmark.itemSlug);

      if (error) {
        const message = getBookmarkErrorMessage(error.message);
        setBookmarkError(message);
        return { ok: false, action: 'none' as const, message };
      }

      setBookmarks((currentBookmarks) => currentBookmarks.filter((currentBookmark) => !(
        currentBookmark.item_type === bookmark.itemType &&
        currentBookmark.item_slug === bookmark.itemSlug
      )));

      return { ok: true, action: 'removed' as const, message: 'Bookmark removed.' };
    }

    const { data, error } = await supabase
      .from('bookmarks')
      .upsert({
        user_id: user.id,
        item_type: bookmark.itemType,
        item_slug: bookmark.itemSlug,
        item_title: bookmark.itemTitle,
        item_path: bookmark.itemPath,
        item_summary: bookmark.itemSummary ?? null
      }, {
        onConflict: 'user_id,item_type,item_slug'
      })
      .select('id, user_id, item_type, item_slug, item_title, item_path, item_summary, created_at')
      .single();

    if (error) {
      const message = getBookmarkErrorMessage(error.message);
      setBookmarkError(message);
      return { ok: false, action: 'none' as const, message };
    }

    setBookmarks((currentBookmarks) => [
      data as BookmarkRow,
      ...currentBookmarks.filter((currentBookmark) => !(
        currentBookmark.item_type === bookmark.itemType &&
        currentBookmark.item_slug === bookmark.itemSlug
      ))
    ]);

    return { ok: true, action: 'saved' as const, message: 'Bookmark saved.' };
  }, [isBookmarked, user]);

  return {
    bookmarks,
    bookmarkError,
    isLoadingBookmarks,
    isBookmarked,
    loadBookmarks,
    toggleBookmark
  };
};
