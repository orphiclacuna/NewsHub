// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './components/NewsCard';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('technology');
  const [category, setCategory] = useState(import.meta.env.VITE_DEFAULT_CATEGORY || 'top');
  const [country, setCountry] = useState(import.meta.env.VITE_DEFAULT_COUNTRY || 'us');

  useEffect(() => {
    fetchNews();
  }, [category, country]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Using newsdata.io API - configure your API key in .env file
      const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
      
      if (!apiKey || apiKey === 'your_newsdata_api_key_here') {
        console.warn('Please set your NewsData.io API key in the .env file');
        throw new Error('API key not configured');
      }
      
      let url;
      
      if (query && query.trim()) {
        // Search for specific topics
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en&size=10`;
      } else {
        // Get news by category and country
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=${category}&language=en&size=10`;
      }
      
      const res = await axios.get(url);
      
      // Transform newsdata.io response to match our component structure
      const transformedArticles = (res.data.results || []).map(article => ({
        title: article.title,
        description: article.description || article.content,
        url: article.link,
        urlToImage: article.image_url,
        publishedAt: article.pubDate,
        source: { name: article.source_id || 'Unknown Source' }
      }));
      
      setArticles(transformedArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
      // For demo purposes, let's add some mock data
      setArticles([
        {
          title: "Breaking: Latest Technology News",
          description: "Stay updated with the latest developments in technology and innovation.",
          url: "#",
          urlToImage: "https://via.placeholder.com/400x200?text=News+Image",
          publishedAt: new Date().toISOString(),
          source: { name: "Tech News" }
        },
        {
          title: "Science Discovery of the Year",
          description: "Scientists make groundbreaking discovery that could change everything.",
          url: "#",
          urlToImage: "https://via.placeholder.com/400x200?text=Science+News",
          publishedAt: new Date().toISOString(),
          source: { name: "Science Daily" }
        }
      ]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  const categories = [
    'business', 'entertainment', 'environment', 'food', 'health', 
    'politics', 'science', 'sports', 'technology', 'top', 'world'
  ];

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'jp', name: 'Japan' },
    { code: 'br', name: 'Brazil' },
    { code: 'mx', name: 'Mexico' }
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        padding: '0 20px'
      }}>
        <h1 style={{ 
          color: 'white',
          fontSize: '3.5rem',
          fontWeight: '700',
          margin: '0 0 10px 0',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          letterSpacing: '-1px'
        }}>
          📰 NewsHub
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.2rem',
          margin: '0',
          fontWeight: '300'
        }}>
          Stay informed with the latest news from around the world
        </p>
      </div>

      {/* Main Container */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Search and Filters Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Search Form */}
            <form onSubmit={handleSearch} style={{ 
              display: 'flex', 
              gap: '12px',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  value={query} 
                  onChange={e => setQuery(e.target.value)} 
                  placeholder="Search for news..." 
                  style={{ 
                    padding: '16px 20px 16px 50px', 
                    fontSize: '16px', 
                    width: '350px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '50px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#f8f9fa'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007bff';
                    e.target.style.backgroundColor = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280',
                  fontSize: '18px'
                }}>
                  🔍
                </div>
              </div>
              <button 
                type="submit"
                style={{
                  padding: '16px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0,123,255,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,123,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.3)';
                }}
              >
                Search
              </button>
            </form>
            
            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151',
                minWidth: 'fit-content'
              }}>
                Category:
              </label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                style={{ 
                  padding: '14px 16px', 
                  fontSize: '15px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: '140px'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Country Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151',
                minWidth: 'fit-content'
              }}>
                Country:
              </label>
              <select 
                value={country} 
                onChange={e => setCountry(e.target.value)}
                style={{ 
                  padding: '14px 16px', 
                  fontSize: '15px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: '160px'
                }}
              >
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: 'white'
          }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '3px solid rgba(255,255,255,0.3)',
              borderTop: '3px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px'
            }}></div>
            <p style={{ 
              fontSize: '18px', 
              fontWeight: '500',
              margin: '0'
            }}>
              Loading latest news...
            </p>
          </div>
        )}

        {/* Articles Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '25px',
          justifyItems: 'center',
          padding: '0 10px'
        }}>
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>

        {/* No Results State */}
        {articles.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px',
            color: 'white'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>📰</div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '600',
              margin: '0 0 10px 0'
            }}>
              No articles found
            </h3>
            <p style={{ 
              fontSize: '16px', 
              opacity: '0.8',
              margin: '0',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Try adjusting your search terms or selecting a different category and country.
            </p>
          </div>
        )}
      </div>

      {/* Add CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .search-form {
            flex-direction: column;
            width: 100%;
          }
          
          .search-input {
            width: 100% !important;
          }
          
          .filters {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
