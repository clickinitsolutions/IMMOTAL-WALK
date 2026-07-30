import React, { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowRight, ArrowLeft, Search, Heart, MessageSquare, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Meditation" | "Philosophy" | "Pranayama" | "Yatra";
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  likes: number;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "The Art of Dying to the Moment: Non-Dual Meditation",
    excerpt: "Discover the profound freedom of Sahaja Dhyana—the effortless state where you cease striving and rest in the silent current of infinite awareness.",
    content: `In the traditional lineages of Advaita and Zen, meditation is not treated as a mechanical task to be achieved. Rather, it is a process of radical surrender—an active 'dying' to the psychological past and future. 

    When we sit on the cushion, we typically bring our entire bag of worldly goals: the desire to become peaceful, the ambition to stop thinking, or the hope of reaching enlightenment. But this very effort to quiet the mind is itself a movement of the mind. As long as there is an 'ego' attempting to manipulate state, there remains a subtle state of tension.

    To practice Sahaja Dhyana is to adopt the stance of the Witness (Sakshi). We do not fight our wandering thoughts, nor do we feed them. We simply observe them as clouds passing across the vast blue dome of our native consciousness. By recognizing that you are the sky—not the clouds—effort dissolves, and you merge into the infinite background of being.`,
    category: "Meditation",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200",
    date: "July 8, 2026",
    readTime: "5 min read",
    author: {
      name: "Acharya Shunya",
      role: "Lineage Guide",
      avatar: "ॐ"
    },
    likes: 124
  },
  {
    id: "post-2",
    title: "Prana and Path: Tuning the Breath for Absolute Kundalini Awakening",
    excerpt: "Learn how the subtle energy channels (Nadis) are purified through rhythmic Kumbhaka, leading to deep neurological and spiritual alignment.",
    content: `Breath is the bridge connecting the physical body to the subtle astral template. According to the Hatha Pradipika, when the breath is unsteady, the mind wanders; when the breath is stilled, the mind achieves a state of unshakeable poise.

    There are 72,000 Nadis (energy pathways) in the human structure. The three main channels—Ida (lunar), Pingala (solar), and Sushumna (central axis)—govern our state of vitality and awareness. When we breathe solely through one nostril or in irregular shallow patterns, we create static currents in the nervous system.

    By practicing Nadi Shodhana (Alternate Nostril Breathing) with precise internal retention (Antar Kumbhaka), we balance the left and right hemispheres of the brain. This calms the amygdala, clears physiological stress, and coaxes the dormant spiritual current (Kundalini) to ascend the central sushumna channel.`,
    category: "Pranayama",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
    date: "June 28, 2026",
    readTime: "7 min read",
    author: {
      name: "Yogi Devendra",
      role: "Pranayama Master",
      avatar: "Y"
    },
    likes: 89
  },
  {
    id: "post-3",
    title: "Living in Alignment: The Four Purusharthas of Life",
    excerpt: "Unpack the ancient Indian architecture of a meaningful life—Dharma, Artha, Kama, and Moksha—and find your true alignment in the modern era.",
    content: `The sages of ancient India did not advocate for a life of immediate, dry asceticism for everyone. Instead, they mapped out a beautiful, balanced householder's journey called the Purusharthas: the four core aims of human existence.

    1. Dharma (Spiritual Righteousness & Duty): Living in accordance with universal cosmic order. It is the steady foundation of ethics and selfless service.
    2. Artha (Material Abundance & Security): Generating the resource and security needed to sustain physical life and support the community.
    3. Kama (Aesthetic Joy & Love): Experiencing beauty, sensory pleasure, companionship, and high art with deep gratitude and conscious presence.
    4. Moksha (Absolute Spiritual Freedom): The final liberation from the cycle of conditioning, realizing your immortal identity.

    When we neglect any of these dimensions, our life feels tilted. True yoga is the integration of all four. We work with integrity (Artha), love with depth (Kama), act with righteousness (Dharma), and dedicate all outcomes to the supreme light (Moksha).`,
    category: "Philosophy",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
    date: "May 15, 2026",
    readTime: "9 min read",
    author: {
      name: "Acharya Shunya",
      role: "Lineage Guide",
      avatar: "ॐ"
    },
    likes: 156
  },
  {
    id: "post-4",
    title: "Pilgrimage to the Sources: A Journey Into Tapovan and Kedarnath",
    excerpt: "Spiritual Yatra is not sightseeing; it is an internal dissolution. Walk with us through the high frozen peaks where the masters meditate.",
    content: `A pilgrim does not travel to 'see' a place, but to 'un-see' the ego. When one leaves behind comforts and steps onto the jagged mountain trails of the high Himalayas, the false identity begins to crack under the scale of the eternal glaciers.

    In the ancient texts, Kedarnath and the Tapovan meadows are described as pure centers of spiritual force. The heavy atmosphere is thick with centuries of intense tapasya (devotional asceticism) performed by silent saints. 

    As you ascend to 14,000 feet, each breath is thin, and the mind is forced to drop its trivial worries. You become intensely present. The roaring Bhagirathi river sings the eternal mantra of 'Soham', and the majestic peaks stand as silent sentinels of pure consciousness. When you return from such a pilgrimage, you do not bring back souvenirs—you bring back a deep, radiant silence that stays in your heart forever.`,
    category: "Yatra",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200",
    date: "April 2, 2026",
    readTime: "6 min read",
    author: {
      name: "Yogi Devendra",
      role: "Pranayama Master",
      avatar: "Y"
    },
    likes: 142
  }
];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Interactive reflections / comments system (local state per post)
  const [reflections, setReflections] = useState<{ [postId: string]: { name: string; content: string; date: string }[] }>({
    "post-1": [
      { name: "Ananda", content: "This article perfectly targeted my meditation block. Realizing I am the sky and not the clouds brought instant release during dawn dhyana.", date: "July 10, 2026" }
    ]
  });
  const [commentForm, setCommentForm] = useState({ name: "", content: "" });
  const [postLikes, setPostLikes] = useState<{ [postId: string]: number }>({
    "post-1": 124,
    "post-2": 89,
    "post-3": 156,
    "post-4": 142
  });
  const [hasLiked, setHasLiked] = useState<{ [postId: string]: boolean }>({});

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[postId]) {
      setPostLikes({ ...postLikes, [postId]: postLikes[postId] - 1 });
      setHasLiked({ ...hasLiked, [postId]: false });
    } else {
      setPostLikes({ ...postLikes, [postId]: postLikes[postId] + 1 });
      setHasLiked({ ...hasLiked, [postId]: true });
    }
  };

  const handleAddReflection = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.content) return;

    const newReflection = {
      name: commentForm.name,
      content: commentForm.content,
      date: "Just now"
    };

    const currentPostReflections = reflections[postId] || [];
    setReflections({
      ...reflections,
      [postId]: [newReflection, ...currentPostReflections]
    });
    setCommentForm({ name: "", content: "" });
  };

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Meditation", "Philosophy", "Pranayama", "Yatra"];

  return (
    <div id="blog-page" className="space-y-12">
      <AnimatePresence mode="wait">
        {!activePost ? (
          <motion.div
            key="blog-list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sage-100 pb-8">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block">
                  Immortal Chronicles
                </span>
                <h2 className="text-4xl font-serif font-bold text-sage-900 tracking-tight">
                  The Ashram Gazette
                </h2>
                <p className="text-sage-600 text-sm max-w-xl leading-relaxed">
                  Deep contemplation on non-dual teachings, breathing templates, traditional yoga philosophy, and high-altitude Himalayan pilgrimages.
                </p>
              </div>

              {/* Search input and category filter */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                <input
                  id="blog-search-input"
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-white rounded-xl py-3 pl-10 pr-4 border border-sage-100 focus:outline-none focus:border-sage-300"
                />
              </div>
            </div>

            {/* Category Pill Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`blog-category-${cat.toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-sage-900 text-gold-100 shadow-xs"
                      : "bg-white text-sage-600 border border-sage-100 hover:bg-sage-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    id={`blog-card-${post.id}`}
                    onClick={() => setActivePost(post)}
                    className="group bg-white rounded-3xl border border-sage-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-sage-900/95 backdrop-blur-md border border-gold-200/20 px-3 py-1 rounded-full text-[9px] font-mono text-gold-200 uppercase tracking-widest">
                          {post.category}
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-[10px] font-mono text-sage-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-xl font-serif font-semibold text-sage-900 group-hover:text-gold-700 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-sage-600 text-xs leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="p-6 pt-0 border-t border-sage-50 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gold-50 border border-gold-200/50 flex items-center justify-center text-[10px] text-gold-700 font-bold font-mono">
                          {post.author.avatar}
                        </div>
                        <span className="text-[10px] font-medium text-sage-700 font-mono">
                          {post.author.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleLike(post.id, e)}
                          className={`flex items-center gap-1 text-[10px] font-mono transition-colors ${
                            hasLiked[post.id] ? "text-red-500" : "text-sage-400 hover:text-red-400"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${hasLiked[post.id] ? "fill-current" : ""}`} />
                          <span>{postLikes[post.id]}</span>
                        </button>

                        <span className="text-sage-300">|</span>

                        <div className="flex items-center gap-1 text-[10px] font-mono text-sage-400">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{(reflections[post.id] || []).length}</span>
                        </div>

                        <ArrowRight className="w-4 h-4 text-sage-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-dashed border-sage-200 rounded-3xl space-y-3">
                <BookOpen className="w-8 h-8 text-sage-300 mx-auto" />
                <h4 className="text-sm font-semibold text-sage-800">No Chronicles Found</h4>
                <p className="text-xs text-sage-500 max-w-xs mx-auto">
                  Try clearing your search query or choosing another category to reveal ancient wisdom.
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          /* Active Article Full View with comments section */
          <motion.div
            key="blog-post-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Back to Blog Button */}
            <button
              id="back-to-blog-btn"
              onClick={() => {
                setActivePost(null);
                window.scrollTo({ top: 0 });
              }}
              className="flex items-center gap-2 text-xs font-semibold text-sage-600 hover:text-sage-900 uppercase tracking-wider bg-white px-4 py-2 rounded-xl border border-sage-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Ashram Gazette</span>
            </button>

            {/* Main Article Cover */}
            <div className="rounded-3xl border border-sage-100 overflow-hidden bg-white shadow-xs">
              <div className="relative h-64 md:h-80 w-full">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[10px] font-mono text-gold-300 uppercase tracking-widest block font-bold bg-sage-900/60 backdrop-blur-xs px-2.5 py-1 rounded-full w-max border border-gold-300/20">
                    {activePost.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
                    {activePost.title}
                  </h1>
                </div>
              </div>

              {/* Author & Stats strip */}
              <div className="px-6 py-4 border-b border-sage-100 bg-[#faf9f5]/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200/50 flex items-center justify-center text-xs text-gold-700 font-bold font-mono">
                    {activePost.author.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-sage-950 font-mono">{activePost.author.name}</h5>
                    <span className="text-[9px] text-sage-400 font-mono tracking-widest uppercase block">{activePost.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono text-sage-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activePost.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activePost.readTime}</span>
                  </div>
                  <span>•</span>
                  <button
                    onClick={(e) => handleLike(activePost.id, e)}
                    className={`flex items-center gap-1 ${hasLiked[activePost.id] ? "text-red-500 font-bold" : "text-sage-500 hover:text-red-500"}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked[activePost.id] ? "fill-current" : ""}`} />
                    <span>{postLikes[activePost.id]} Likes</span>
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8 space-y-6 text-sm text-sage-800 leading-relaxed font-serif whitespace-pre-line">
                {activePost.content}
              </div>
            </div>

            {/* Interactive Comments & Reflections Board */}
            <div className="bg-white border border-sage-100 rounded-3xl p-6 md:p-8 space-y-8">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gold-600" />
                <h3 className="text-lg font-serif font-bold text-sage-900">Aspirant Reflections & Insights</h3>
              </div>

              {/* Submissions Form */}
              <form onSubmit={(e) => handleAddReflection(activePost.id, e)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-widest text-sage-400 mb-1">
                      Aspirant Name
                    </label>
                    <input
                      id="reflection-name"
                      type="text"
                      required
                      value={commentForm.name}
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                      placeholder="Your spiritual or worldly name"
                      className="w-full text-xs text-sage-950 bg-sage-50/50 rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-sage-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-widest text-sage-400 mb-1">
                    Your Insight / Experience
                  </label>
                  <textarea
                    id="reflection-content"
                    rows={3}
                    required
                    value={commentForm.content}
                    onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                    placeholder="Contribute your experience, dhyana observations, or questions here..."
                    className="w-full text-xs text-sage-950 bg-sage-50/50 rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-sage-300 resize-none"
                  ></textarea>
                </div>

                <button
                  id="add-reflection-btn"
                  type="submit"
                  className="px-5 py-2.5 bg-sage-900 text-gold-100 hover:bg-sage-950 rounded-xl font-semibold text-[10px] uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pin Reflection on Board</span>
                </button>
              </form>

              {/* Comments list */}
              <div className="space-y-4 pt-6 border-t border-sage-100">
                {reflections[activePost.id] && reflections[activePost.id].length > 0 ? (
                  reflections[activePost.id].map((ref, idx) => (
                    <div key={idx} className="bg-sage-50/50 p-4 rounded-2xl border border-sage-100/50 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-sage-400">
                        <span className="font-bold text-sage-800">{ref.name}</span>
                        <span>{ref.date}</span>
                      </div>
                      <p className="text-xs text-sage-700 leading-relaxed font-sans">{ref.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-sage-500 italic text-center py-4">No reflections penned yet. Be the first to share your contemplation.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
