import React, { useState } from 'react';
import { MessageSquare, Heart, Repeat, Send, Sparkles, AlertCircle } from 'lucide-react';
import { CricketXPost } from '../../types/game';
import { playClickSound, playCashChime } from '../../utils/sound';

interface CricketXTabProps {
  posts: CricketXPost[];
  chairmanName: string;
  country: string;
  onPostTweet: (content: string) => void;
}

export const CricketXTab: React.FC<CricketXTabProps> = ({
  posts,
  chairmanName,
  country,
  onPostTweet
}) => {
  const [tweetText, setTweetText] = useState('');
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const handleLike = (id: string, initialLikes: number) => {
    playClickSound();
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + 1
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tweetText.trim()) return;
    playClickSound();
    onPostTweet(tweetText.trim());
    setTweetText('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <MessageSquare className="w-4 h-4" />
          <span>Real-Time Public Discourse & Fandom Pulse</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          CricketX Social Outrage & Sentiment Feed
        </h2>
        <p className="text-xs text-slate-400">
          The epicenter of cricket fan emotions. Read passionate tweets, pundit debates, and post executive communiqués to influence public sentiment.
        </p>
      </div>

      {/* Chairman Tweet Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
              {chairmanName.charAt(0)}
            </span>
            <span>Post Official Executive Tweet as Chairman {chairmanName}</span>
          </div>

          <textarea
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            placeholder="Address the fans, defend selections, or rally the nation ahead of the next mega clash..."
            rows={2}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
          />

          <div className="flex justify-between items-center">
            <span className="text-[11px] text-slate-500 font-mono">
              Direct broadcast to 85M+ followers
            </span>
            <button
              type="submit"
              disabled={!tweetText.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post to CricketX</span>
            </button>
          </div>
        </form>
      </div>

      {/* Feed List */}
      <div className="space-y-3">
        {posts.map((post) => {
          const currentLikes = likeCounts[post.id] ?? post.likes;
          return (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-md"
                    style={{ backgroundColor: post.avatarBg }}
                  >
                    {post.displayName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{post.displayName}</span>
                      <span className="text-xs text-slate-500 font-mono">{post.handle}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{post.timestamp}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                  post.sentiment === 'positive'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : post.sentiment === 'negative'
                    ? 'bg-rose-500/10 text-rose-400'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {post.sentiment}
                </span>
              </div>

              <p className="text-xs text-slate-200 my-2 leading-relaxed">{post.content}</p>

              <div className="flex items-center gap-6 pt-2 border-t border-slate-800/60 text-xs text-slate-400 font-mono">
                <button
                  onClick={() => handleLike(post.id, post.likes)}
                  className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>{currentLikes.toLocaleString()}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <Repeat className="w-3.5 h-3.5" />
                  <span>{post.retweets.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
