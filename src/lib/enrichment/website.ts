import type { WebsiteEnrichment } from './types'

export function getFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

export function enrichWebsite(name: string, domain?: string): WebsiteEnrichment {
  if (domain) {
    return { faviconUrl: getFaviconUrl(domain), domain }
  }

  const inferred = inferDomain(name)
  if (inferred) {
    return { faviconUrl: getFaviconUrl(inferred), domain: inferred }
  }

  return { faviconUrl: null, domain: null }
}

function inferDomain(name: string): string | null {
  const known: Record<string, string> = {
    'Google': 'google.com',
    'Google Search': 'google.com',
    'Yahoo!': 'yahoo.com',
    'Yahoo Directory': 'yahoo.com',
    'Amazon': 'amazon.com',
    'eBay': 'ebay.com',
    'Wikipedia': 'wikipedia.org',
    'Wikipedia Launches': 'wikipedia.org',
    'Facebook': 'facebook.com',
    'Facebook Opens to All': 'facebook.com',
    'YouTube': 'youtube.com',
    'Twitter': 'twitter.com',
    'Instagram': 'instagram.com',
    'Reddit': 'reddit.com',
    'Netflix': 'netflix.com',
    'MySpace': 'myspace.com',
    'LinkedIn': 'linkedin.com',
    'Friendster': 'friendster.com',
    'Snapchat': 'snapchat.com',
    'TikTok': 'tiktok.com',
    'TikTok (Douyin)': 'tiktok.com',
    'TikTok Global': 'tiktok.com',
    'TikTok Mania': 'tiktok.com',
    'Tumblr': 'tumblr.com',
    'Pinterest': 'pinterest.com',
    'WhatsApp': 'whatsapp.com',
    'Discord': 'discord.com',
    'Twitch': 'twitch.com',
    'Slack': 'slack.com',
    'Gmail': 'gmail.com',
    'Hotmail': 'hotmail.com',
    'MSN Messenger': 'msn.com',
    'Napster': 'napster.com',
    'GeoCities': 'geocities.com',
    'Google.com': 'google.com',
    'Chrome Browser': 'google.com',
    'Google+': 'google.com',
    'Google AdWords': 'google.com',
    'Mosaic Browser': 'ncsa.uiuc.edu',
    'Netscape Navigator': 'netscape.com',
    'Mozilla Firefox': 'mozilla.org',
    'Ask Jeeves': 'ask.com',
    'AIM': 'aim.com',
    'Foursquare': 'foursquare.com',
    'Tinder': 'tinder.com',
    'ChatGPT': 'chatgpt.com',
    'OpenSea': 'opensea.io',
    'Zoom': 'zoom.us',
    'Clubhouse': 'clubhouse.com',
    'BeReal': 'bere.al',
    'Threads by Meta': 'threads.net',
    'Disney+': 'disneyplus.com',
    'Apple Music': 'apple.com',
    'Spotify': 'spotify.com',
    'Coursera': 'coursera.org',
    'Character.AI': 'character.ai',
    'Perplexity AI': 'perplexity.ai',
    'Amazon Echo': 'amazon.com',
    'Apple Vision Pro Store': 'apple.com',
    'AI Agent Marketplace': 'perplexity.ai',
    'Decentralized Social': 'bsky.app',
    'Ethereum Whitepaper': 'ethereum.org',
    'iTunes': 'apple.com',
    'iPhone': 'apple.com',
    'Slashdot': 'slashdot.org',
    'Digg': 'digg.com',
    'StumbleUpon': 'stumbleupon.com',
    'del.icio.us': 'delicious.com',
    'Flickr': 'flickr.com',
    'Photobucket': 'photobucket.com',
    'LiveJournal': 'livejournal.com',
    'Xanga': 'xanga.com',
    'Neopets': 'neopets.com',
    'Pirate Bay': 'thepiratebay.org',
    'MegaUpload': 'megaupload.com',
  }

  for (const [key, domain] of Object.entries(known)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return domain
  }

  return null
}
