// src/components/NewsCard.jsx
import React, { useState } from 'react';

const NewsCard = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!article) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const cardStyle = {
    border: '1px solid #e1e5e9',
    borderRadius: '16px',
    padding: '0',
    width: '380px',
    minHeight: '450px',
    textAlign: 'left',
    margin: '12px',
    backgroundColor: '#fff',
    boxShadow: isHovered 
      ? '0 12px 30px rgba(0,0,0,0.15)' 
      : '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  const imageStyle = {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '0',
    transition: 'transform 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
  };

  const contentStyle = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  };

  const categoryBadge = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(0, 123, 255, 0.9)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  return (
    <div 
      style={cardStyle}
      onClick={() => window.open(article.url, '_blank')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {article.urlToImage && !imageError ? (
          <>
            <img 
              src={article.urlToImage} 
              alt="news" 
              style={imageStyle}
              onError={() => setImageError(true)}
            />
            <div style={categoryBadge}>
              News
            </div>
          </>
        ) : (
          <div style={{
            width: '100%',
            height: '220px',
            backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px'
          }}>
            📰
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={contentStyle}>
        <h3 style={{ 
          color: '#1a1a1a', 
          fontSize: '18px', 
          lineHeight: '1.4',
          marginBottom: '12px',
          fontWeight: '600',
          letterSpacing: '-0.2px'
        }}>
          {truncateText(article.title, 80)}
        </h3>
        
        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '16px',
          flex: 1
        }}>
          {truncateText(article.description, 120)}
        </p>

        {/* Footer */}
        <div style={{ 
          borderTop: '1px solid #f3f4f6',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#007bff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {article.source.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                color: '#374151',
                margin: '0'
              }}>
                {truncateText(article.source.name, 20)}
              </p>
              <p style={{ 
                fontSize: '11px', 
                color: '#9ca3af',
                margin: '0'
              }}>
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          
          <div style={{
            backgroundColor: isHovered ? '#007bff' : '#f8f9fa',
            color: isHovered ? 'white' : '#6b7280',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Read More
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
