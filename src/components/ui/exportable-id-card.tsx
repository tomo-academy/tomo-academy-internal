import QRCode from "react-qr-code";

interface ExportableIDCardProps {
  employee: {
    id: string;
    name: string;
    role: string;
    employeeId: string;
    location: string;
    photo?: string;
  };
  side: 'front' | 'back';
}

export function ExportableIDCard({ employee, side }: ExportableIDCardProps) {
  const profileUrl = `https://tomoacademy.site/employee/${employee.id}`;

  const renderAvatar = () => {
    if (employee.photo) {
      return (
        <img
          src={employee.photo}
          alt={employee.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          crossOrigin="anonymous"
        />
      );
    }
    
    const initials = employee.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, #ec4899, #a855f7)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px'
      }}>
        {initials}
      </div>
    );
  };

  if (side === 'front') {
    return (
      <div style={{
        width: '320px',
        height: '200px',
        background: 'linear-gradient(135deg, #ffffff 0%, #fce7f3 50%, #f3e8ff 100%)',
        border: '2px solid rgba(251, 207, 232, 0.5)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          height: '40px',
          background: 'linear-gradient(90deg, #db2777, #ec4899, #db2777)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px'
            }}>
              <img src="/cropped_circle_image (1).png" alt="TOMO" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ color: 'white' }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', margin: 0, lineHeight: '1', letterSpacing: '0.5px' }}>
                TOMO ACADEMY ✓
              </p>
              <p style={{ fontSize: '8px', margin: 0, opacity: 0.9, lineHeight: '1.2' }}>EDUCATION ELEVATED</p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            padding: '2px 6px',
            borderRadius: '4px',
            color: 'white',
            fontSize: '8px',
            fontWeight: 'bold',
            zIndex: 10
          }}>
            🛡️ ID
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          height: 'calc(200px - 40px)',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 10px',
          gap: '10px'
        }}>
          {/* Photo */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #fce7f3, #f3e8ff)',
            border: '2px solid rgba(251, 207, 232, 0.5)',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            {renderAvatar()}
          </div>

          {/* Info */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            minWidth: 0
          }}>
            <div style={{ marginBottom: '4px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '900',
                background: 'linear-gradient(90deg, #db2777, #ec4899, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                lineHeight: '1.2',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {employee.name}
              </h2>
              <p style={{
                fontSize: '10px',
                color: '#334155',
                fontWeight: 'bold',
                margin: '2px 0 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {employee.role}
              </p>
            </div>

            <div style={{ marginBottom: '4px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'linear-gradient(90deg, #fce7f3, #fce7f3)',
                padding: '2px 6px',
                borderRadius: '6px',
                border: '1px solid rgba(251, 207, 232, 0.5)',
                fontSize: '9px',
                marginBottom: '2px'
              }}>
                <span>🛡️</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#831843' }}>
                  {employee.employeeId}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'linear-gradient(90deg, #f3e8ff, #f3e8ff)',
                padding: '2px 6px',
                borderRadius: '6px',
                border: '1px solid rgba(233, 213, 255, 0.5)',
                fontSize: '9px'
              }}>
                <span>📍</span>
                <span style={{ fontWeight: '600', color: '#581c87' }}>
                  {employee.location || 'Remote'}
                </span>
              </div>
            </div>

            {/* QR Code */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '4px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px'
              }}>
                <div style={{
                  padding: '4px',
                  background: 'white',
                  borderRadius: '6px',
                  border: '2px solid rgba(251, 207, 232, 0.6)'
                }}>
                  <QRCode value={profileUrl} size={36} />
                </div>
                <span style={{
                  fontSize: '8px',
                  color: '#db2777',
                  fontWeight: 'bold'
                }}>
                  Scan Profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Back side
  return (
    <div style={{
      width: '320px',
      height: '200px',
      background: 'linear-gradient(135deg, #ffffff 0%, #fce7f3 50%, #f3e8ff 100%)',
      border: '2px solid rgba(251, 207, 232, 0.5)',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      justifyContent: 'space-between'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: 'linear-gradient(135deg, #fce7f3, #f3e8ff)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(251, 207, 232, 0.5)'
          }}>
            <img src="/cropped_circle_image (1).png" alt="Logo" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          </div>
          <div>
            <p style={{
              fontSize: '9px',
              fontWeight: '900',
              margin: 0,
              lineHeight: '1',
              letterSpacing: '0.5px',
              background: 'linear-gradient(90deg, #db2777, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              TOMO ACADEMY
            </p>
            <p style={{
              fontSize: '6px',
              fontWeight: '600',
              color: '#64748b',
              margin: '2px 0 0 0'
            }}>
              EDUCATION ELEVATED
            </p>
          </div>
        </div>
        <div style={{
          padding: '2px 6px',
          background: 'linear-gradient(90deg, #ec4899, #a855f7)',
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <p style={{ fontSize: '7px', fontWeight: 'bold', color: 'white', margin: 0, lineHeight: '1' }}>MEMBER</p>
          <p style={{ fontSize: '6px', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>2025</p>
        </div>
      </div>

      {/* QR Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}>
        <div style={{
          padding: '6px',
          background: 'white',
          borderRadius: '8px',
          border: '2px solid rgba(251, 207, 232, 0.6)'
        }}>
          <QRCode value={profileUrl} size={48} />
        </div>
        
        <div style={{
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 10px',
          background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(251, 207, 232, 0.6)'
        }}>
          <span style={{ fontSize: '10px' }}>👁️</span>
          <p style={{
            fontSize: '7px',
            fontWeight: 'bold',
            margin: 0,
            background: 'linear-gradient(90deg, #db2777, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            SCAN TO VIEW PROFILE
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
          marginBottom: '4px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 6px',
            background: 'linear-gradient(90deg, #fce7f3, #f3e8ff)',
            borderRadius: '6px',
            border: '1px solid rgba(251, 207, 232, 0.5)'
          }}>
            <span style={{ fontSize: '8px' }}>🌐</span>
            <span style={{
              fontSize: '6px',
              fontWeight: 'bold',
              color: '#831843',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              tomoacademy.com
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 6px',
            background: 'linear-gradient(90deg, #f3e8ff, #fce7f3)',
            borderRadius: '6px',
            border: '1px solid rgba(233, 213, 255, 0.5)'
          }}>
            <span style={{ fontSize: '8px' }}>✉️</span>
            <span style={{
              fontSize: '6px',
              fontWeight: 'bold',
              color: '#581c87',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              support@tomo
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '2px 8px',
          background: 'linear-gradient(90deg, #fce7f3, #f3e8ff)',
          borderRadius: '6px',
          border: '1px solid rgba(251, 207, 232, 0.5)',
          marginBottom: '4px'
        }}>
          <span style={{ fontSize: '6px', fontWeight: 'bold', color: '#475569' }}>FOLLOW:</span>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(239, 68, 68, 0.5)'
          }}>
            <span style={{ fontSize: '10px' }}>▶️</span>
          </div>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(251, 207, 232, 0.5)'
          }}>
            <span style={{ fontSize: '10px' }}>📷</span>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          paddingTop: '4px',
          borderTop: '1px solid rgba(251, 207, 232, 0.5)'
        }}>
          <p style={{
            fontSize: '6px',
            fontWeight: 'bold',
            margin: 0,
            background: 'linear-gradient(90deg, #db2777, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.2'
          }}>
            OFFICIAL MEMBER CARD
          </p>
          <p style={{
            fontSize: '5px',
            color: '#64748b',
            margin: 0,
            lineHeight: '1.2'
          }}>
            Valid 2025 • Unauthorized use prohibited
          </p>
        </div>
      </div>
    </div>
  );
}
