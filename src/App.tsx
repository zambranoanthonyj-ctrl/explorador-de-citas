/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  RefreshCw,
  Copy,
  Check,
  Bookmark,
  ArrowLeft,
  Trash2,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { QUOTES, Quote, QuoteCategory } from './data/quotes';

type CategoryFilter = 'all' | QuoteCategory;

const FAVORITES_STORAGE_KEY = 'aforismo_favorite_ids_v1';

export default function App() {
  // Persisted favorites
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return ['phil-01', 'lead-02'];
  });

  // Active category filter
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  // Search filter for catalog / favorites
  const [searchQuery, setSearchQuery] = useState('');

  // Quote navigation state (shuffle bag + history stack)
  const [currentQuoteId, setCurrentQuoteId] = useState<string>(() => {
    const initialIndex = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[initialIndex].id;
  });
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [seenIdsInCycle, setSeenIdsInCycle] = useState<string[]>([]);
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Copy feedback state (tracks which quote ID was just copied)
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Ignore storage errors
    }
  }, [favoriteIds]);

  // Filtered pool of quotes for the randomizer
  const categoryPool = useMemo(() => {
    if (activeCategory === 'all') return QUOTES;
    return QUOTES.filter((q) => q.category === activeCategory);
  }, [activeCategory]);

  // Current quote object
  const currentQuote = useMemo(() => {
    return (
      QUOTES.find((q) => q.id === currentQuoteId) ||
      categoryPool[0] ||
      QUOTES[0]
    );
  }, [currentQuoteId, categoryPool]);

  // Favorite quotes list
  const favoriteQuotes = useMemo(() => {
    return favoriteIds
      .map((id) => QUOTES.find((q) => q.id === id))
      .filter((q): q is Quote => Boolean(q));
  }, [favoriteIds]);

  // Pick next random quote without immediate repetition
  const handleNextQuote = useCallback(
    (overrideCategory?: CategoryFilter) => {
      const targetCategory = overrideCategory ?? activeCategory;
      const pool =
        targetCategory === 'all'
          ? QUOTES
          : QUOTES.filter((q) => q.category === targetCategory);

      if (pool.length === 0) return;

      // Exclude current quote and seen quotes in current cycle
      const unseenPool = pool.filter(
        (q) => q.id !== currentQuote.id && !seenIdsInCycle.includes(q.id)
      );

      let candidates = unseenPool;
      let nextSeenCycle = [...seenIdsInCycle, currentQuote.id];

      // If we exhausted the cycle, reset cycle but still avoid repeating currentQuote
      if (candidates.length === 0) {
        candidates = pool.filter((q) => q.id !== currentQuote.id);
        nextSeenCycle = [currentQuote.id];
      }

      if (candidates.length === 0) {
        candidates = pool;
      }

      const randomIndex = Math.floor(Math.random() * candidates.length);
      const nextQuote = candidates[randomIndex];

      setIsTransitioning(true);
      setTimeout(() => {
        setHistoryStack((prev) => [...prev.slice(-29), currentQuote.id]);
        setSeenIdsInCycle(nextSeenCycle);
        setCurrentQuoteId(nextQuote.id);
        setSessionCount((prev) => prev + 1);
        setCopiedId(null);
        setIsTransitioning(false);
      }, 130);
    },
    [activeCategory, currentQuote.id, seenIdsInCycle]
  );

  // Navigate to previous quote in session history
  const handlePreviousQuote = useCallback(() => {
    if (historyStack.length === 0) return;
    const previousId = historyStack[historyStack.length - 1];
    setIsTransitioning(true);
    setTimeout(() => {
      setHistoryStack((prev) => prev.slice(0, -1));
      setCurrentQuoteId(previousId);
      setCopiedId(null);
      setIsTransitioning(false);
    }, 130);
  }, [historyStack]);

  // Switch category filter and load a quote from that category if needed
  const handleSelectCategory = useCallback(
    (category: CategoryFilter) => {
      setActiveCategory(category);
      if (category !== 'all' && currentQuote.category !== category) {
        handleNextQuote(category);
      }
    },
    [currentQuote.category, handleNextQuote]
  );

  // Copy quote text to clipboard
  const handleCopyQuote = useCallback(async (quote: Quote) => {
    const formatted = `«${quote.text}» — ${quote.author} (${quote.roleOrWork})`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedId(quote.id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === quote.id ? null : prev));
      }, 2000);
    } catch {
      // Fallback copy method for restricted environments
      const textArea = document.createElement('textarea');
      textArea.value = formatted;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(quote.id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === quote.id ? null : prev));
      }, 2000);
    }
  }, []);

  // Toggle favorite state for a quote
  const handleToggleFavorite = useCallback((quoteId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [quoteId, ...prev]
    );
  }, []);

  // Select a specific quote from favorites or catalog to view on main stage
  const handleFocusQuote = useCallback(
    (quote: Quote) => {
      if (quote.id === currentQuote.id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setIsTransitioning(true);
      setTimeout(() => {
        setHistoryStack((prev) => [...prev.slice(-29), currentQuote.id]);
        setCurrentQuoteId(quote.id);
        setSessionCount((prev) => prev + 1);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 130);
    },
    [currentQuote.id]
  );

  // Keyboard shortcuts (Space = next quote, C = copy current, F = toggle favorite)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleNextQuote();
      } else if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
        handleCopyQuote(currentQuote);
      } else if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey) {
        handleToggleFavorite(currentQuote.id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentQuote, handleCopyQuote, handleNextQuote, handleToggleFavorite]);

  // Filtered catalog for the bottom directory
  const filteredCatalog = useMemo(() => {
    return QUOTES.filter((q) => {
      const matchesCategory =
        activeCategory === 'all' || q.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;
      return (
        matchesCategory &&
        (q.text.toLowerCase().includes(query) ||
          q.author.toLowerCase().includes(query) ||
          q.roleOrWork.toLowerCase().includes(query))
      );
    });
  }, [activeCategory, searchQuery]);

  const isCurrentFavorite = favoriteIds.includes(currentQuote.id);
  const isCurrentCopied = copiedId === currentQuote.id;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-slate-50/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#inicio"
            className="text-xl font-serif font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Aforismo
          </a>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#inicio"
              onClick={() => handleSelectCategory('all')}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Explorar
            </a>
            <a
              href="#inicio"
              onClick={() => handleSelectCategory('philosophy')}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Filosofía y Vida
            </a>
            <a
              href="#inicio"
              onClick={() => handleSelectCategory('leadership')}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Liderazgo y Negocios
            </a>
            <a
              href="#favoritos"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Favoritos ({favoriteIds.length})
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleNextQuote()}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Siguiente cita
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="inicio" className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-10 md:py-14">
        {/* Top Toolbar: Interactive Category Filter + Session Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Interactive Segmented Control (Buttons) */}
          <div
            role="group"
            aria-label="Filtrar citas por categoría"
            className="inline-flex items-center gap-1 p-1 bg-slate-200/75 rounded-xl self-start"
          >
            <button
              type="button"
              onClick={() => handleSelectCategory('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({QUOTES.length})
            </button>
            <button
              type="button"
              onClick={() => handleSelectCategory('philosophy')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'philosophy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Filosofía y Vida ({QUOTES.filter((q) => q.category === 'philosophy').length})
            </button>
            <button
              type="button"
              onClick={() => handleSelectCategory('leadership')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'leadership'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Liderazgo y Productividad ({QUOTES.filter((q) => q.category === 'leadership').length})
            </button>
          </div>

          {/* Unboxed Metadata: Session statistics */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
            <span>Exploradas hoy: {sessionCount}</span>
            <span aria-hidden="true">·</span>
            <span>Guardadas: {favoriteIds.length}</span>
          </div>
        </div>

        {/* Focal Anchor: Primary Quote Stage Card */}
        <section
          aria-live="polite"
          className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 md:p-16 transition-opacity duration-150"
        >
          <div
            className={`transition-all duration-150 ${
              isTransitioning
                ? 'opacity-0 translate-y-1'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-slate-700">
                  {currentQuote.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentQuote.yearOrEra}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-slate-400">
                  Ref. {currentQuote.id.toUpperCase()}
                </span>
              </div>
              <span className="text-slate-400 hidden sm:inline">
                Presiona Espacio para cambiar de cita
              </span>
            </div>

            {/* Expressive Display Serif Quote */}
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] leading-[1.3] tracking-tight text-slate-900 max-w-4xl mb-8 [text-wrap:balance]">
              «{currentQuote.text}»
            </blockquote>

            {/* Author & Source Attribution (Unboxed typography with separators) */}
            <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <cite className="not-italic text-lg font-semibold text-slate-900 block">
                  {currentQuote.author}
                </cite>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mt-1">
                  <span>{currentQuote.roleOrWork}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-600 italic">
                    {currentQuote.reflectionNote}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action Bar */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary CTA: Next Quote */}
              <button
                type="button"
                onClick={() => handleNextQuote()}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RefreshCw
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isTransitioning ? 'rotate-180' : ''
                  }`}
                />
                <span>Siguiente cita</span>
              </button>

              {/* Secondary Action: Previous Quote */}
              <button
                type="button"
                onClick={handlePreviousQuote}
                disabled={historyStack.length === 0}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200/80 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="Volver a la cita anterior"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
            </div>

            {/* Utility Controls: Copy to Clipboard & Save to Favorites */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleCopyQuote(currentQuote)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isCurrentCopied
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {isCurrentCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Cita copiada</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copiar cita</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleToggleFavorite(currentQuote.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isCurrentFavorite
                    ? 'bg-blue-50/80 border-blue-200 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isCurrentFavorite
                      ? 'fill-blue-600 text-blue-600'
                      : 'text-slate-500'
                  }`}
                />
                <span>
                  {isCurrentFavorite ? 'En favoritos' : 'Guardar en favoritos'}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Saved Favorites Collection */}
        <section id="favoritos" className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                01. Tu Colección de Favoritos
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Citas guardadas en tu navegador para consulta rápida o referencia personal.
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono tabular-nums">
              {favoriteQuotes.length}{' '}
              {favoriteQuotes.length === 1 ? 'cita guardada' : 'citas guardadas'}
            </div>
          </div>

          {favoriteQuotes.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
              <p className="text-base font-medium text-slate-800">
                Aún no tienes citas guardadas en tu colección
              </p>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Pulsa el botón «Guardar en favoritos» o la tecla F mientras exploras para conservar tus reflexiones preferidas aquí.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteQuotes.map((quote) => {
                const isCopied = copiedId === quote.id;
                const isActive = currentQuote.id === quote.id;
                return (
                  <article
                    key={quote.id}
                    className={`bg-white border rounded-2xl p-6 flex flex-col justify-between transition-colors ${
                      isActive
                        ? 'border-blue-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Unboxed Metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-slate-700">
                            {quote.author}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{quote.categoryLabel}</span>
                        </div>
                        {isActive && (
                          <span className="text-blue-600 font-medium">
                            En pantalla
                          </span>
                        )}
                      </div>

                      <p className="font-serif text-lg text-slate-900 leading-snug mb-4">
                        «{quote.text}»
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-500 truncate">
                        {quote.roleOrWork}
                      </span>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleFocusQuote(quote)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          title="Ver en el escenario principal"
                        >
                          <span>Destacar</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyQuote(quote)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          title="Copiar cita"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copiada</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleFavorite(quote.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          title="Quitar de favoritos"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Quitar</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Section 3: Complete Curated Catalog Directory */}
        <section id="catalogo" className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                02. Índice Completo de la Colección
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explora o busca por autor, obra o palabra clave dentro de las{' '}
                {filteredCatalog.length} citas activas.
              </p>
            </div>

            {/* Functional Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar autor o palabra..."
                aria-label="Buscar citas por autor o palabra clave"
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {filteredCatalog.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
              <p className="text-base font-medium text-slate-800">
                No se encontraron citas que coincidan con «{searchQuery}»
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-200/80">
              {filteredCatalog.map((quote, index) => {
                const isFav = favoriteIds.includes(quote.id);
                const isSelected = currentQuote.id === quote.id;
                return (
                  <div
                    key={quote.id}
                    className={`p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                      isSelected ? 'bg-blue-50/30' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono tabular-nums text-slate-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-slate-800">
                          {quote.author}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{quote.roleOrWork}</span>
                        <span aria-hidden="true">·</span>
                        <span>{quote.categoryLabel}</span>
                      </div>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        «{quote.text}»
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleFocusQuote(quote)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {isSelected ? 'Mostrando' : 'Leer cita'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleFavorite(quote.id)}
                        aria-label={
                          isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'
                        }
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          isFav
                            ? 'border-blue-200 bg-blue-50 text-blue-600'
                            : 'border-slate-200 bg-white text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isFav ? 'fill-blue-600 text-blue-600' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-slate-800">
              Aforismo
            </span>
            <span aria-hidden="true">·</span>
            <span>Colección de Filosofía, Motivación y Liderazgo</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Atajos: Espacio (Siguiente)</span>
            <span aria-hidden="true">·</span>
            <span>C (Copiar)</span>
            <span aria-hidden="true">·</span>
            <span>F (Favorito)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
