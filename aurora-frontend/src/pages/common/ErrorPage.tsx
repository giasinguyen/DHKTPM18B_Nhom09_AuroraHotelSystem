import { Link } from 'react-router-dom';
import errorImage from '../../assets/images/commons/404.gif';

export default function ErrorPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-white relative overflow-hidden py-4">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-5xl flex flex-col items-center justify-center h-full">
        {/* Animated 404 number - smaller */}
        <div className="mb-2 md:mb-4 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary">
            404
          </h1>
        </div>

        {/* Caveman image - fit in viewport, NO SHADOW */}
        <div className="mb-3 md:mb-4 animate-float shrink-0" style={{ maxHeight: '40vh' }}>
          <img
            src={errorImage}
            alt="404 Error - Caveman disconnected"
            className="relative w-auto h-auto max-w-[350px] md:max-w-[450px] lg:max-w-[500px] max-h-[40vh] object-contain mx-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Error message - compact */}
        <div className="mb-3 md:mb-4 animate-fade-in-up animation-delay-300 shrink-0">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
            Không tìm thấy trang
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-1 max-w-md mx-auto leading-relaxed">
            Trang bạn tìm kiếm có thể đã bị di chuyển, xóa hoặc tạm thời không khả dụng.
          </p>
        </div>

        {/* Animated button */}
        <div className="animate-fade-in-up animation-delay-500 shrink-0">
          <Link
            to="/"
            className="group relative inline-block px-6 py-3 md:px-8 md:py-4 bg-primary text-white font-semibold text-base md:text-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-110 hover:bg-primary/70"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Về trang chủ
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}