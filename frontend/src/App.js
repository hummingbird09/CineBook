import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // State for authenticated user
  const [showAuthForm, setShowAuthForm] = useState('login'); // 'login' or 'register'
  const [currentPage, setCurrentPage] = useState('movies'); // 'movies', 'bookings', 'auth'

  useEffect(() => {
    // Check for stored user token on component mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData)); // Store user data
    setCurrentPage('movies'); // Go back to movies after login
    setShowAuthForm('login'); // Reset auth form view
  };

  const handleRegisterSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData)); // Store user data
    setCurrentPage('movies'); // Go back to movies after registration
    setShowAuthForm('login'); // Reset auth form view
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); // Clear stored user data
    setCurrentPage('movies'); // Go back to movies
  };

  const handleBookNowClick = (movie) => {
    if (!currentUser) {
      alert('Please log in to book tickets.'); // Simple alert for now
      setCurrentPage('auth');
      setShowAuthForm('login');
      return;
    }
    setSelectedMovie(movie);
  };

  const handleBackToMovies = () => {
    setSelectedMovie(null);
    setCurrentPage('movies');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', color: '#e0e0e0' }}>
        <p style={{ fontSize: '2rem', color: '#6a5acd', animation: 'pulse 1.5s infinite' }}>Loading movies...</p>
        <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', color: '#e0e0e0' }}>
        <p style={{ fontSize: '2rem', color: '#ff6b6b' }}>Error: {error}</p>
        <p style={{ fontSize: '1.25rem', color: '#b0b0b0', marginTop: '0.5rem' }}>Please ensure your backend server is running and accessible at http://localhost:5000.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: '#e0e0e0', padding: '1.5rem', boxSizing: 'border-box' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '900',
          color: '#6a5acd',
          marginBottom: '0.8rem',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          letterSpacing: '0.05em'
        }}>
          CineBook
        </h1>
        <p style={{ fontSize: '1.6rem', color: '#b0b0b0', fontStyle: 'italic' }}>Your Gateway to Cinematic Experiences</p>

        {/* Navigation Bar */}
        <nav style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2rem' }}>
          <button
            onClick={() => { setCurrentPage('movies'); setSelectedMovie(null); }}
            style={{
              background: 'none',
              border: `2px solid ${currentPage === 'movies' ? '#6a5acd' : 'transparent'}`,
              color: currentPage === 'movies' ? '#6a5acd' : '#e0e0e0',
              fontWeight: 'bold',
              padding: '0.7rem 1.4rem',
              borderRadius: '0.75rem',
              fontSize: '1.05rem',
              boxShadow: currentPage === 'movies' ? '0 0 15px rgba(106, 90, 205, 0.6)' : 'none',
              transition: 'all 0.3s ease',
              backgroundColor: currentPage === 'movies' ? 'rgba(106, 90, 205, 0.1)' : 'transparent',
            }}
          >
            Movies
          </button>
          {currentUser ? (
            <>
              <button
                onClick={() => setCurrentPage('bookings')}
                style={{
                  background: 'none',
                  border: `2px solid ${currentPage === 'bookings' ? '#6a5acd' : 'transparent'}`,
                  color: currentPage === 'bookings' ? '#6a5acd' : '#e0e0e0',
                  fontWeight: 'bold',
                  padding: '0.7rem 1.4rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.05rem',
                  boxShadow: currentPage === 'bookings' ? '0 0 15px rgba(106, 90, 205, 0.6)' : 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: currentPage === 'bookings' ? 'rgba(106, 90, 205, 0.1)' : 'transparent',
                }}
              >
                My Bookings
              </button>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '0.7rem 1.4rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.05rem',
                }}
              >
                Logout ({currentUser.name})
              </button>
            </>
          ) : (
            <button
              onClick={() => setCurrentPage('auth')}
              style={{
                background: 'none',
                border: `2px solid ${currentPage === 'auth' ? '#6a5acd' : 'transparent'}`,
                color: currentPage === 'auth' ? '#6a5acd' : '#e0e0e0',
                fontWeight: 'bold',
                padding: '0.7rem 1.4rem',
                borderRadius: '0.75rem',
                fontSize: '1.05rem',
                boxShadow: currentPage === 'auth' ? '0 0 15px rgba(106, 90, 205, 0.6)' : 'none',
                transition: 'all 0.3s ease',
                backgroundColor: currentPage === 'auth' ? 'rgba(106, 90, 205, 0.1)' : 'transparent',
              }}
            >
              Login / Register
            </button>
          )}
        </nav>
      </header>

      {currentPage === 'auth' && !currentUser && (
        showAuthForm === 'login' ? (
          <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setShowAuthForm('register')} />
        ) : (
          <Register onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={() => setShowAuthForm('login')} />
        )
      )}

      {currentPage === 'movies' && (
        selectedMovie ? (
          <MovieDetail movie={selectedMovie} onBack={handleBackToMovies} currentUser={currentUser} />
        ) : (
          <section style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            padding: '1rem'
          }}>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} onBookNow={handleBookNowClick} />
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#b0b0b0', fontSize: '1.2rem', gridColumn: '1 / -1', padding: '2rem', backgroundColor: '#1e1e1e', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
                No movies available. Please add some using your backend API!
              </p>
            )}
          </section>
        )
      )}

      {currentPage === 'bookings' && currentUser && (
        <BookingHistory currentUser={currentUser} />
      )}

      <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#888', fontSize: '0.9rem', borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
        <p>&copy; {new Date().getFullYear()} CineBook. All rights reserved.</p>
        <p>Designed with passion for cinema lovers.</p>
      </footer>
    </div>
  );
};

// --- MovieCard Component (Rupee Price) ---
const MovieCard = ({ movie, onBookNow }) => {
  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      borderRadius: '1rem',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: '1px solid #333',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.6)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)'; }}
    onClick={() => onBookNow(movie)}
    >
      <img
        src={movie.imageUrl}
        alt={movie.title}
        style={{
          width: '100%',
          height: '20rem',
          objectFit: 'cover',
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          borderBottom: '1px solid #333'
        }}
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x600/333333/FFFFFF?text=${movie.title.replace(/\s/g, '+')}`; }}
      />
      <div style={{ padding: '1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: '#6a5acd',
          marginBottom: '0.8rem',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>{movie.title}</h2>
        <p style={{ color: '#b0b0b0', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{movie.genre}</p>
        <p style={{
          color: '#c0c0c0',
          fontSize: '1rem',
          marginBottom: '1.5rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>{movie.description}</p>

        <div style={{ marginBottom: '1.5rem', marginTop: 'auto' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '600', color: '#e0e0e0', marginBottom: '0.8rem' }}>Showtimes:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {movie.showtimes.map((time, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#3a3a3a',
                  color: '#e0e0e0',
                  fontSize: '0.85rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '9999px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #555'
                }}
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#32cd32', marginBottom: '1.5rem', textAlign: 'right' }}>
          Price: ₹{movie.ticketPrice ? movie.ticketPrice.toFixed(2) : 'N/A'}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onBookNow(movie); }}
          style={{
            width: '100%',
            backgroundColor: '#6a5acd',
            color: 'white',
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
            marginTop: 'auto'
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// --- MovieDetail Component (Rupee Price) ---
const MovieDetail = ({ movie, onBack, currentUser }) => {
  const [selectedShowtime, setSelectedShowtime] = useState(movie.showtimes[0]);
  const [numTickets, setNumTickets] = useState(1);
  const [message, setMessage] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const totalPrice = movie.ticketPrice * numTickets;

  const handleConfirmBooking = async () => {
    setIsBooking(true);
    setMessage('');

    if (!currentUser || !currentUser.token) {
      setMessage('Error: You must be logged in to book tickets.');
      setIsBooking(false);
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          movieId: movie._id,
          showtime: selectedShowtime,
          numberOfTickets: numTickets,
          user: currentUser._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed. Please try again.');
      }

      setMessage(`Booking successful! Confirmation ID: ${data._id}`);
    } catch (error) {
      console.error('Booking error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsBooking(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      backgroundColor: '#1e1e1e',
      borderRadius: '1rem',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
      padding: '2.5rem',
      border: '1px solid #333'
    }}>
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          color: '#8a7acd',
          marginBottom: '2rem',
          background: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          boxShadow: 'none',
          transform: 'none',
          border: '1px solid transparent',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8a7acd'; e.currentTarget.style.backgroundColor = 'rgba(138, 122, 205, 0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 14.707a1 1 0 01-1.414 0L7.293 10.414a1 1 0 010-1.414l3.99-3.99a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Movies
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          '@media (min-width: 768px)': {
            flexDirection: 'row',
            alignItems: 'flex-start'
          }
        }}>
          <div style={{ flexShrink: 0, width: '100%', maxWidth: '300px' }}>
            <img
              src={movie.imageUrl}
              alt={movie.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '0.75rem',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                border: '1px solid #444'
              }}
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x600/333333/FFFFFF?text=${movie.title.replace(/\s/g, '+')}`; }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 'bold',
              color: '#6a5acd',
              marginBottom: '1rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>{movie.title}</h2>
            <p style={{ color: '#b0b0b0', fontSize: '1.2rem', marginBottom: '1.2rem' }}>
              {movie.genre} | {movie.duration} | {movie.rating}
            </p>
            <p style={{ color: '#c0c0c0', fontSize: '1.1rem', marginBottom: '2rem' }}>{movie.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#e0e0e0', marginBottom: '0.6rem' }}>Director:</h3>
                <p style={{ color: '#c0c0c0', fontSize: '1.05rem' }}>{movie.director}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#e0e0e0', marginBottom: '0.6rem' }}>Cast:</h3>
                <p style={{ color: '#c0c0c0', fontSize: '1.05rem' }}>{movie.cast.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #333', paddingTop: '2.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#e0e0e0', marginBottom: '1rem' }}>Select Showtime:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {movie.showtimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedShowtime(time)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    backgroundColor: selectedShowtime === time ? '#6a5acd' : '#3a3a3a',
                    color: selectedShowtime === time ? 'white' : '#e0e0e0',
                    boxShadow: selectedShowtime === time ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.15)',
                    border: selectedShowtime === time ? '1px solid #6a5acd' : '1px solid #555',
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#e0e0e0', marginBottom: '1rem' }}>Number of Tickets:</h3>
            <input
              type="number"
              min="1"
              value={numTickets}
              onChange={(e) => setNumTickets(parseInt(e.target.value) || 1)}
              style={{ width: '8rem', fontSize: '1.1rem' }}
            />
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#32cd32', marginBottom: '2.5rem', textAlign: 'right' }}>
            Total Price: ₹{totalPrice.toFixed(2)}
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={isBooking || !currentUser}
            style={{
              width: '100%',
              backgroundColor: '#32cd32',
              color: 'white',
              fontSize: '1.2rem',
              letterSpacing: '0.08em',
              padding: '1rem 1.5rem',
              borderRadius: '0.75rem',
            }}
          >
            {isBooking ? 'Booking...' : (currentUser ? 'Confirm Booking' : 'Login to Book')}
          </button>
          {message && (
            <p style={{
              marginTop: '1.5rem',
              textAlign: 'center',
              color: message.startsWith('Error') ? '#ff6b6b' : '#32cd32',
              fontSize: '0.95rem',
              backgroundColor: message.startsWith('Error') ? '#3a1a1a' : '#1a3a1a',
              padding: '0.8rem',
              borderRadius: '0.5rem',
              border: `1px solid ${message.startsWith('Error') ? '#ff6b6b' : '#32cd32'}`
            }}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- BookingHistory Component (NOW WITH CANCEL FUNCTIONALITY) ---
const BookingHistory = ({ currentUser }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelMessage, setCancelMessage] = useState(''); // For cancel feedback

  const fetchBookings = async () => {
    if (!currentUser || !currentUser.token) {
      setError('You must be logged in to view bookings.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Set loading true before fetching
      const response = await fetch('http://localhost:5000/api/bookings/mybookings', {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings.');
      }

      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentUser]); // Re-fetch when currentUser changes

  const handleCancelBooking = async (bookingId) => {
    // IMPORTANT: In a real application, you'd use a custom modal here
    // instead of window.confirm for better UI/UX.
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return; // User cancelled the confirmation
    }

    setCancelMessage(''); // Clear previous messages
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel booking.');
      }

      setCancelMessage('Booking cancelled successfully!');
      // Remove the cancelled booking from the local state to update UI immediately
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setCancelMessage(`Error: ${err.message}`);
    } finally {
      setTimeout(() => setCancelMessage(''), 5000); // Clear message after 5 seconds
    }
  };


  if (loading) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem', backgroundColor: '#1e1e1e', borderRadius: '1rem', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', textAlign: 'center', border: '1px solid #333' }}>
        <p style={{ fontSize: '1.5rem', color: '#6a5acd', animation: 'pulse 1.5s infinite' }}>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem', backgroundColor: '#1e1e1e', borderRadius: '1rem', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', textAlign: 'center', border: '1px solid #333' }}>
        <p style={{ fontSize: '1.5rem', color: '#ff6b6b' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem', backgroundColor: '#1e1e1e', borderRadius: '1rem', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)', border: '1px solid #333' }}>
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#6a5acd',
        marginBottom: '2rem',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        My Booking History for {currentUser.name}
      </h2>
      {cancelMessage && (
        <p style={{
          marginTop: '1rem',
          textAlign: 'center',
          color: cancelMessage.startsWith('Error') ? '#ff6b6b' : '#32cd32',
          fontSize: '0.95rem',
          backgroundColor: cancelMessage.startsWith('Error') ? '#3a1a1a' : '#1a3a1a',
          padding: '0.8rem',
          borderRadius: '0.5rem',
          border: `1px solid ${cancelMessage.startsWith('Error') ? '#ff6b6b' : '#32cd32'}`,
          marginBottom: '1.5rem'
        }}>{cancelMessage}</p>
      )}
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#b0b0b0', fontSize: '1.2rem', padding: '1.5rem', backgroundColor: '#2a2a2a', borderRadius: '0.75rem', border: '1px solid #444' }}>
          You have no bookings yet. Go book some movies and they'll appear here!
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {bookings.map((booking) => (
            <div key={booking._id} style={{
              backgroundColor: '#2a2a2a',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              border: '1px solid #444',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#e0e0e0', marginBottom: '0.8rem', borderBottom: '1px dashed #555', paddingBottom: '0.5rem' }}>
                  Movie: <span style={{ color: '#6a5acd' }}>{booking.movie ? booking.movie.title : 'N/A'}</span>
                </h3>
                <p style={{ color: '#c0c0c0', fontSize: '1rem', marginBottom: '0.4rem' }}>
                  Showtime: <span style={{ fontWeight: 'bold', color: '#9f7aea' }}>{booking.showtime}</span>
                </p>
                <p style={{ color: '#c0c0c0', fontSize: '1rem', marginBottom: '0.4rem' }}>
                  Tickets: <span style={{ fontWeight: 'bold', color: '#9f7aea' }}>{booking.numberOfTickets}</span>
                </p>
                <p style={{ color: '#c0c0c0', fontSize: '1rem', marginBottom: '0.8rem' }}>
                  Total Price: <span style={{ fontWeight: 'bold', color: '#32cd32' }}>₹{booking.totalPrice.toFixed(2)}</span>
                </p>
              </div>
              <div style={{ marginTop: '1rem', borderTop: '1px solid #555', paddingTop: '1rem' }}>
                <p style={{ color: '#a0a0a0', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  Booked On: {new Date(booking.bookingDate).toLocaleDateString()} at {new Date(booking.bookingDate).toLocaleTimeString()}
                </p>
                <p style={{ color: '#a0a0a0', fontSize: '0.8rem', wordBreak: 'break-all' }}>
                  Booking ID: {booking._id}
                </p>
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  style={{
                    backgroundColor: '#dc3545', /* Red for cancel */
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    marginTop: '1rem',
                    width: '100%',
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;