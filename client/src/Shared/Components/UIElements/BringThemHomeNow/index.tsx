import React, { useEffect } from 'react';

interface BringThemHomeNowProps {
  lang?: 'en' | 'he';
}

const BringThemHomeNow: React.FC<BringThemHomeNowProps> = ({ lang = 'en' }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://bringthemhomenow.net/1.1.0/hostages-ticker.js';
    script.setAttribute('integrity', 'sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne');
    script.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.head.removeChild(script);
    };
  }, []);

  return <div  id="bthn" lang={lang}></div>;
};

export default BringThemHomeNow;
