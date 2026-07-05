import { useEffect, useState } from 'react';

export type Route = 'home' | 'services' | 'doctors' | 'chat';

function parseHash(): Route {
  const h = window.location.hash.replace('#/', '').replace('#', '');
  if (h === 'services' || h === 'doctors' || h === 'chat') return h;
  return 'home';
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (r: Route) => {
    window.location.hash = `/${r}`;
  };

  return { route, navigate };
}
