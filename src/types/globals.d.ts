// Global browser type extensions for GTM / Google Analytics
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}
