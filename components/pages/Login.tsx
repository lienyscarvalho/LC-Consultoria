import React, { useState } from 'react';
import { User, View } from '../../types';
import { ArrowRight, Lock, Mail, User as UserIcon } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      onLogin({
        name: name || (isRegistering ? 'Novo Atleta' : 'Carlos Oliveira'),
        email: email,
        // Tradução dos dados do usuário simulado
        level: isRegistering ? 'Iniciante' : 'Atleta Avançado',
        since: isRegistering ? 'Out 2023' : 'Jan 2023',
        // Placeholder for student photo
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
      });
    }, 1500);
  };

  return (
    <div className="h-full bg-white dark:bg-lf-black flex flex-col px-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-lf-navy/10 dark:from-lf-navy/40 to-transparent z-0"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-lf-navy/10 dark:bg-lf-neon/10 rounded-full blur-3xl"></div>

      <div className="flex-1 flex flex-col justify-center relative z-10 w-full max-w-sm mx-auto space-y-4">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="w-14 h-14 bg-lf-navy dark:bg-lf-neon rounded-xl flex items-center justify-center shadow-lg dark:shadow-[0_0_20px_rgba(230,255,0,0.3)] mb-3 transform rotate-3">
            <span className="font-display font-black text-white dark:text-lf-black text-2xl tracking-tighter">LF</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white text-center">
            Lucas França<br/>
            <span className="text-lf-navy dark:text-lf-neon text-sm tracking-[0.2em] font-medium uppercase">Personal Trainer</span>
          </h1>
        </div>

        {/* Form Container */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="text-center">
            <h2 className="text-gray-900 dark:text-white font-bold text-lg mb-0.5">
              {isRegistering ? 'Crie sua conta' : 'Acesse seu painel'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[10px]">
              {isRegistering ? 'Comece sua transformação hoje.' : 'Bem-vindo de volta, atleta.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <div className="relative group animate-in slide-in-from-left-2 duration-300">
                <UserIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-lf-navy dark:group-focus-within:text-lf-neon transition-colors" />
                <input 
                  type="text" 
                  placeholder="Seu primeiro nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-lf-dark/50 border border-gray-200 dark:border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-lf-navy dark:focus:border-lf-neon focus:ring-1 focus:ring-lf-navy dark:focus:ring-lf-neon transition-all placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-lf-navy dark:group-focus-within:text-lf-neon transition-colors" />
                <input 
                  type="email" 
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-lf-dark/50 border border-gray-200 dark:border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-lf-navy dark:focus:border-lf-neon focus:ring-1 focus:ring-lf-navy dark:focus:ring-lf-neon transition-all placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-lf-navy dark:group-focus-within:text-lf-neon transition-colors" />
                <input 
                  type="password" 
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-lf-dark/50 border border-gray-200 dark:border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-lf-navy dark:focus:border-lf-neon focus:ring-1 focus:ring-lf-navy dark:focus:ring-lf-neon transition-all placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-colors shadow-md dark:shadow-lf-neon/10 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white dark:border-lf-black border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  {isRegistering ? 'CADASTRAR' : 'ENTRAR'} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Google Login Button */}
            {!isRegistering && (
              <button 
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    onLogin({
                      name: name || 'Google User',
                      email: 'google.user@gmail.com',
                      level: 'Atleta Intermediário',
                      since: 'Fev 2024',
                      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
                    });
                  }, 1500);
                }}
                className="w-full bg-white dark:bg-lf-dark border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95 shadow-sm text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                CONTINUAR COM GOOGLE
              </button>
            )}
          </form>

          {/* Toggle Login/Register */}
          <div className="space-y-4 text-center">
            {!isRegistering && (
              <p className="text-xs text-gray-500">
                Esqueceu sua senha? <a href="#" className="text-lf-navy dark:text-lf-neon hover:underline">Recuperar acesso</a>
              </p>
            )}
            
            <div className="pt-2 border-t border-gray-200 dark:border-white/5">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                <button 
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="ml-2 text-lf-navy dark:text-lf-neon font-bold hover:underline uppercase text-xs tracking-wider"
                >
                  {isRegistering ? 'Fazer Login' : 'Cadastre-se'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto py-4 w-full text-center relative z-10">
        <span className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">Powered by LF Methodology</span>
      </div>
    </div>
  );
};

export default Login;