import { Video, Play } from 'lucide-react';

export function VideoSection() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <Video className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Videos</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="relative group cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-blue-600 ml-1" />
              </div>
            </div>
            <p className="mt-3 text-gray-700 font-medium">Educational Video {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
