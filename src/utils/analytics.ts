/**
 * Google Analytics 4 (GA4) & Google Ads Enhanced Real Estate Conversion Tracker
 * Authoritative Tracking Module for Saheel Luxton Wakad (https://saheeluxton.in)
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type RealEstateEvent = 
  | 'generate_lead'
  | 'view_cost_sheet'
  | 'download_cost_sheet'
  | 'download_brochure'
  | 'click_to_call'
  | 'whatsapp_inquiry'
  | 'schedule_vip_visit'
  | 'book_vip_cab'
  | 'calculate_emi'
  | 'calculate_commute'
  | 'view_item_plan';

export interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  currency?: string;
  typology?: string;
  lead_type?: string;
  source_locality?: string;
  [key: string]: any;
}

/**
 * Dispatch custom real estate conversion event to Google Analytics 4 & dataLayer
 */
export function trackConversion(eventName: RealEstateEvent, params: EventParams = {}) {
  try {
    const enrichedParams = {
      project_name: 'Saheel Luxton Wakad',
      maharera_no: 'PM1260002502043',
      timestamp: new Date().toISOString(),
      ...params
    };

    // Google Tag Manager dataLayer push
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ecommerce: enrichedParams,
        ...enrichedParams
      });

      // Google Analytics gtag dispatch
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, enrichedParams);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`📊 [GA4 Real Estate Tracker] Event: "${eventName}"`, enrichedParams);
    }
  } catch (err) {
    console.warn('Analytics tracking error:', err);
  }
}
