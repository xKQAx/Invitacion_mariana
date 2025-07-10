import { useState, useRef, useEffect } from "react";
import './App.css';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [rejectButtonPosition, setRejectButtonPosition] = useState({ x: 0, y: 0 });
  const [rejectAttempts, setRejectAttempts] = useState(0);
  const [showRejectMessage, setShowRejectMessage] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showRejectButton, setShowRejectButton] = useState(true);
  const rejectButtonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setShowRejectButton(false);
  };

  const getRandomPosition = () => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && cardRef.current) {
      // En móvil, mantener el botón dentro de la tarjeta
      const cardRect = cardRef.current.getBoundingClientRect();
      const buttonWidth = 120;
      const buttonHeight = 45;
      const padding = 20;
      
      const minX = cardRect.left + padding;
      const maxX = cardRect.right - buttonWidth - padding;
      const minY = cardRect.top + padding;
      const maxY = cardRect.bottom - buttonHeight - padding;
      
      return {
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * (maxY - minY) + minY
      };
    } else {
      // En desktop, usar toda la pantalla
      const padding = 150;
      const maxX = window.innerWidth - padding;
      const maxY = window.innerHeight - padding;
      
      let newX, newY;
      do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
      } while (
        Math.abs(newX - mousePosition.x) < 200 || 
        Math.abs(newY - mousePosition.y) < 200
      );
      
      return { x: newX, y: newY };
    }
  };

  const handleRejectHover = () => {
    setRejectAttempts(prev => prev + 1);
    
    if (rejectAttempts >= 3) {
      setShowRejectMessage(true);
      setTimeout(() => setShowRejectMessage(false), 2000);
    }
    
    const newPosition = getRandomPosition();
    setRejectButtonPosition(newPosition);
  };

const handleRejectClick = (e: React.MouseEvent | React.TouchEvent) => {
  e.preventDefault();
  handleRejectHover();
};

  return (
    <div className="invitation-container">
      <div className="invitation-bg-image"></div>
      <div className="wave-background"></div>

      {/* Mensaje de rechazo flotante */}
      {showRejectMessage && (
        <div className="reject-message">
          <p>¡Vamos, Mari! 😅</p>
          <p>Sabes que quieres verla... 🙈</p>
        </div>
      )}

      {/* Botón de rechazo flotante */}
      {!accepted && rejectAttempts > 0 && (
        <button 
          ref={rejectButtonRef}
          className="reject-button-floating"
          style={{
            left: `${rejectButtonPosition.x}px`,
            top: `${rejectButtonPosition.y}px`,
          }}
          onMouseEnter={handleRejectHover}
          onTouchStart={handleRejectHover}
          onClick={handleRejectClick}
          onTouchEnd={handleRejectClick}
        >
          {rejectAttempts === 1 && "¡Espera! 😰"}
          {rejectAttempts === 2 && "¡No puedes! 🏃‍♂️"}
          {rejectAttempts === 3 && "¡Imposible! 😤"}
          {rejectAttempts >= 4 && "¡Nunca! 🤪"}
        </button>
      )}

      <div className="invitation-card" ref={cardRef}>
        {!accepted ? (
          <>
            <div className="movie-poster">🎬</div>
            <h1 className="animated-title">¡Hola Mari!</h1>
            <div className="movie-info">
              <h2 className="movie-title">MATERIALISTAS</h2>
              <div className="movie-details">
                <span className="date">📅 14 de Agosto</span>
                <span className="time">🕐 Tarde perfecta</span>
                <span className="companion">👫 Tú y yo</span>
              </div>
            </div>
            
            <p className="invitation-text">
              ¿Suficiente sorpresa, jakjajak?
            </p>
            <p className="invitation-subtitle">
              Crispetas, risas y buen parche 🍿
            </p>
            
            <div className="animated-heart">🎭</div>
            
            <div className="buttons-container">
              <button 
                className="accept-button" 
                onClick={handleAccept}
              >
                ¡Sí, vamos! 🎉
              </button>
              
              {showRejectButton && rejectAttempts === 0 && (
                <button 
                  className="reject-button"
                  onMouseEnter={handleRejectHover}
                  onTouchStart={handleRejectHover}
                  onClick={handleRejectClick}
                >
                  No, paso 😅
                </button>
              )}
            </div>
            
            <div className="hint">
              <p>*Pista: Solo hay una respuesta correcta 😉</p>
            </div>
          </>
        ) : (
          <div className="success-message">
            <div className="celebration-big">🎉</div>
            <h1 className="success-title">¡PERFECTO!</h1>
            <div className="success-content">
              <p className="success-text">
                ¡Sabía que dirías que sí! 😄
              </p>
              <p className="success-text">
                Jum, no recuerdo haber visto romcoms... 🎬✨
              </p>
              <div className="success-details">
                <div className="detail-item">
                  <span className="icon">🎬</span>
                  <span>Materialistas</span>
                </div>
                <div className="detail-item">
                  <span className="icon">📅</span>
                  <span>14 de Agosto</span>
                </div>
                <div className="detail-item">
                  <span className="icon">🍿</span>
                  <span>Crispetas incluidas</span>
                </div>
              </div>
            </div>
            <div className="floating-hearts">
                <span>🤍</span>
                <span>🌟</span>
                <span>😊</span>
            </div>
            <div className="final-message">
              <p>¡Va a ser un buen día! 😊</p>
            </div>
          </div>
        )}
      </div>

      <div className="background-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>
    </div>
  );
}

export default App;