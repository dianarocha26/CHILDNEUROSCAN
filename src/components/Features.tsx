import { Activity, TrendingUp, BookOpen, Users } from 'lucide-react';

interface FeaturesProps {
  translations: {
    title: string;
    tracking: { title: string; description: string };
    analysis: { title: string; description: string };
    resources: { title: string; description: string };
    community: { title: string; description: string };
  };
}

export function Features({ translations }: FeaturesProps) {
  const features = [
    {
      icon: Activity,
      title: translations.tracking.title,
      description: translations.tracking.description,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: translations.analysis.title,
      description: translations.analysis.description,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: BookOpen,
      title: translations.resources.title,
      description: translations.resources.description,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Users,
      title: translations.community.title,
      description: translations.community.description,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        {translations.title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group animate-scale-in"
              style={{ animationDelay: (index * 0.1) + 's' }}
            >
              <div className={'w-14 h-14 bg-gradient-to-br ' + feature.gradient + ' rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
