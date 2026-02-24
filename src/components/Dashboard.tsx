import { useState } from 'react';
import {
  Home,
  ClipboardList,
  TrendingUp,
  Calendar,
  FileText,
  LogOut,
  Menu,
  X,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ScreeningList } from './ScreeningList';
import { ConditionsList } from './ConditionsList';
import { ScreeningResults } from './ScreeningResults';

type View = 'home' | 'screening' | 'conditions' | 'results' | 'tracking';

export function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut, user, guestMode } = useAuth();

  const navigation = [
    { id: 'home', name: 'Inicio', icon: Home },
    { id: 'screening', name: 'Evaluaciones', icon: ClipboardList },
    { id: 'results', name: 'Resultados', icon: BarChart3 },
    { id: 'conditions', name: 'Condiciones', icon: FileText },
    { id: 'tracking', name: 'Seguimiento', icon: TrendingUp },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">ChildNeuroScan</h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as View)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              {guestMode && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Modo Invitado
                </span>
              )}
              {user && (
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
              )}
              <button
                onClick={handleSignOut}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Salir</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id as View);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Salir</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bienvenido a ChildNeuroScan
              </h2>
              <p className="text-gray-600 mb-6">
                Plataforma completa para la detección temprana y seguimiento del neurodesarrollo infantil.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id as View)}
                      className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-all border border-blue-100"
                    >
                      <Icon className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {currentView === 'screening' && <ScreeningList />}
        {currentView === 'results' && <ScreeningResults />}
        {currentView === 'conditions' && <ConditionsList />}
        {currentView === 'tracking' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Seguimiento</h2>
              <p className="text-gray-600 mb-6">
                Registra y monitorea el progreso de tu hijo
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <Calendar className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Diario de Comportamiento</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Registra comportamientos, desencadenantes y patrones diarios
                  </p>
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
                    Próximamente →
                  </button>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <FileText className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Control de Medicamentos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Administra dosis, adherencia y efectos secundarios
                  </p>
                  <button className="text-sm font-medium text-green-600 hover:text-green-700">
                    Próximamente →
                  </button>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                  <TrendingUp className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Objetivos de Terapia</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Establece y da seguimiento a objetivos terapéuticos
                  </p>
                  <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
                    Próximamente →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
