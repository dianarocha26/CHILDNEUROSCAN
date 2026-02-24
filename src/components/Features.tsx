import { Target, LineChart, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Tracking',
    description: 'Record daily progress',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: LineChart,
    title: 'Analysis',
    description: 'Evidence-based insights',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Lightbulb,
    title: 'Resources',
    description: 'Expert guidance',
    color: 'from-amber-500 to-orange-500'
  }
];

export function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
        >
          <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}>
            <feature.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
