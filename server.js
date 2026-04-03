const mongoose = require('mongoose');
const app      = require('./src/app');
require('dotenv').config();

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret) {
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });
}

const PORT = process.env.PORT || 5000;

const cloudinaryFetch = (imageUrl) => {
  if (!cloudinaryCloudName) return imageUrl;
  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/fetch/c_fill,w_800,q_auto,f_auto/${encodeURIComponent(imageUrl)}`;
};

const IMG = {
  // Louis Vuitton
  lv_neverfull:   'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  lv_speedy:      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
  lv_twist:       'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
  lv_capucines:   'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
  lv_pochette:    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
  lv_loafers:     'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  lv_trainer:     'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80',
  lv_runaway:     'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
  lv_tambour:     'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
  lv_moon:        'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
  lv_scarf:       'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
  lv_belt:        'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80',

  // Chanel
  ch_classicflap: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
  ch_boy:         'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  ch_cocohandle:  'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
  ch_19flap:      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
  ch_miniflap:    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
  ch_j12:         'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
  ch_premiere:    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
  ch_tennis:      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
  ch_camellia:    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
  ch_cococrush:   'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  ch_slingback:   'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
  ch_ballet:      'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&q=80',

  // Hermès
  h_birkin30:     'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
  h_kelly:        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  h_constance:    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
  h_picotin:      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
  h_birkin25croc: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
  h_lindy:        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  h_capecod:      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
  h_arceau:       'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
  h_collier:      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
  h_oran:         'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
  h_scarf90:      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
  h_twilly:       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',

  // Rolex
  r_sub:          'https://images.unsplash.com/photo-1565372915220-08a257a03bf2?w=600&q=80',
  r_datejust:     'https://images.unsplash.com/photo-1606078547826-66350aa4e582?w=600&q=80',
  r_daytona:      'https://images.unsplash.com/photo-1615438286695-1fb8ed5bc8fd?w=600&q=80',
  r_gmt:          'https://images.unsplash.com/photo-159835705b0c516?auto=format&fit=crop&w=600&q=80',
  r_daydate:      'https://images.unsplash.com/photo-1448486137621-8d99a8d35fef?w=600&q=80',
  r_daydate2:     'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
  r_explorer:     'https://images.unsplash.com/photo-1550071454-26e7f0c0e1aa?w=600&q=80',
  r_skydweller:   'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600&q=80',
  r_yachtmaster:  'https://images.unsplash.com/photo-1561336315-dfdc364d6cc4?w=600&q=80',
  r_pearlmaster:  'https://images.unsplash.com/photo-1583015600025-c9bd7e505b73?w=600&q=80',
  r_cellini:      'https://images.unsplash.com/photo-1618516308542-020a67f3f87a?w=600&q=80',
  r_datejust31:   'https://images.unsplash.com/photo-1516916055493-af84c167e013?w=600&q=80',
  r_submariner2:  'https://images.unsplash.com/photo-1542860197-6308a7c9a281?w=600&q=80',
  r_cosmograph:  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=600&q=80',
  r_milgauss2:   'https://images.unsplash.com/photo-1519741491466-e543c7b83591?w=600&q=80',

  // Chanel Watches
  ch_j12:         'https://images.unsplash.com/photo-1464375117522-1311d4e1256c?w=600&q=80',
  ch_premiere:    'https://images.unsplash.com/photo-1518562475002-4ec49cbd02f1?w=600&q=80',

  // Hermès Watches
  h_capecod:      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',
  h_arceau:       'https://images.unsplash.com/photo-1519709174956-9f2d6554b7e6?w=600&q=80',

  // Louis Vuitton Watches
  lv_tambour:     'https://images.unsplash.com/photo-1541976076758-6dcf1fb05038?w=600&q=80',
  lv_moon:        'https://images.unsplash.com/photo-1458253329476-1ebb8593a652?w=600&q=80',

  // Gucci
  g_marmont:      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
  g_dionysus:     'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  g_horsebit:     'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
  g_ophidia:      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
  g_jackie:       'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
  g_ace:          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  g_princetown:   'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80',
  g_rhyton:       'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
  g_gtimeless:    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
  g_necklace:     'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
  g_belt:         'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80',
  g_scarf:        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',

  // Omega Watches
  o_seamaster:    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80',
  o_speedmaster:  'https://images.unsplash.com/photo-1519659520444-1b8a2a2b5fd1?w=600&q=80',
  o_constellation:'https://images.unsplash.com/photo-1516097132797-4ecf9da6d543?w=600&q=80',
  o_deville:      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80',

  // TAG Heuer Watches
  t_carrera:      'https://images.unsplash.com/photo-1553462308-0661c7546c84?w=600&q=80',
  t_aquaracer:    'https://images.unsplash.com/photo-1516883465372-0ec1f2d4cbad?w=600&q=80',
  t_monaco:       'https://images.unsplash.com/photo-1514960565813-22f4da4fbeda?w=600&q=80',
  t_formula:      'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&q=80',

  // Breitling Watches
  b_navitimer:    'https://images.unsplash.com/photo-1526481280694-3be3666dbcb0?w=600&q=80',
  b_superocean:   'https://images.unsplash.com/photo-1576096849400-b1ba30a88f72?w=600&q=80',
  b_chronomat:    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
  b_avenger:      'https://images.unsplash.com/photo-1548625149-2bf3293c78bc?w=600&q=80',

  // Cartier Watches
  c_tank:         'https://images.unsplash.com/photo-1563362399-2cb3b2f4f642?w=600&q=80',
  c_santos:       'https://images.unsplash.com/photo-1513871527-7b37edd0d9e9?w=600&q=80',
  c_ballon:       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
  c_pantherre:    'https://images.unsplash.com/photo-1519741491466-e543c7b83591?w=600&q=80',

  // Prada
  p_saffiano:     'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
  p_reedition:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  p_galleria:     'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  p_cleo:         'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
  p_cahier:       'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
  p_symbole:      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
  p_monolith:     'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
  p_cloudbust:    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  p_blockheel:    'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&q=80',
  p_necklace:     'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  p_belt:         'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80',
  p_hat:          'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80',

  // Dyson — unique per product type
  dy_airwrap:     'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
  dy_supersonic:  'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
  dy_corrale:     'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
  dy_airstrait:   'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
  dy_v15:         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  dy_v12:         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  dy_v11:         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  dy_v10:         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  dy_omni:        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  dy_gen5:        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  dy_robot:       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  dy_purifier:    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
  dy_fan:         'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
  dy_lamp:        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
  dy_zone:        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  dy_accessory:   'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
};

// Use Cloudinary fetch wrapper for all images when Cloudinary is configured
for (const key in IMG) {
  if (IMG.hasOwnProperty(key)) {
    IMG[key] = cloudinaryFetch(IMG[key]);
  }
}

const PRODUCTS_SEED = [

  // ════════════════════════════════
  // LOUIS VUITTON — 12 items
  // ════════════════════════════════
  { name: 'Neverfull MM Tote',        brand: 'Louis Vuitton', category: 'Handbags',    price: 1860,  featured: true,  image: IMG.lv_neverfull,   description: 'The iconic Neverfull MM in Monogram canvas. Spacious, elegant, and timeless.' },
  { name: 'Speedy 30 Bandoulière',    brand: 'Louis Vuitton', category: 'Handbags',    price: 1550,  featured: false, image: IMG.lv_speedy,      description: 'The Speedy 30 in Monogram canvas with detachable shoulder strap.' },
  { name: 'Twist MM Bag',             brand: 'Louis Vuitton', category: 'Handbags',    price: 4700,  featured: true,  image: IMG.lv_twist,       description: 'The Twist MM in Epi leather with iconic LV twist lock closure.' },
  { name: 'Capucines BB Bag',         brand: 'Louis Vuitton', category: 'Handbags',    price: 6200,  featured: true,  image: IMG.lv_capucines,   description: 'The Capucines BB in Taurillon leather — understated Parisian elegance.' },
  { name: 'Pochette Métis Bag',       brand: 'Louis Vuitton', category: 'Handbags',    price: 2150,  featured: false, image: IMG.lv_pochette,    description: 'LV Pochette Métis in Monogram canvas with flap closure.' },
  { name: 'Monogram Canvas Loafers',  brand: 'Louis Vuitton', category: 'Shoes',       price: 1100,  featured: false, image: IMG.lv_loafers,     description: 'Louis Vuitton monogram canvas loafers with leather lining.' },
  { name: 'LV Trainer Sneakers',      brand: 'Louis Vuitton', category: 'Shoes',       price: 1290,  featured: false, image: IMG.lv_trainer,     description: 'Iconic LV Trainer in Monogram canvas with rubber sole.' },
  { name: 'Run Away Sneakers',        brand: 'Louis Vuitton', category: 'Shoes',       price: 980,   featured: false, image: IMG.lv_runaway,     description: 'LV Run Away sneakers in technical fabric with leather trim.' },
  { name: 'Tambour Horizon Watch',    brand: 'Louis Vuitton', category: 'Watches',     price: 3200,  featured: false, image: IMG.lv_tambour,     description: 'Louis Vuitton Tambour Horizon connected watch with sapphire crystal.' },
  { name: 'Tambour Moon Watch',       brand: 'Louis Vuitton', category: 'Watches',     price: 8500,  featured: false, image: IMG.lv_moon,        description: 'LV Tambour Moon Dual Time in 18k pink gold.' },
  { name: 'Monogram Silk Scarf',      brand: 'Louis Vuitton', category: 'Accessories', price: 520,   featured: false, image: IMG.lv_scarf,       description: 'Louis Vuitton 90cm silk scarf in classic Monogram print.' },
  { name: 'Monogram Reversible Belt', brand: 'Louis Vuitton', category: 'Accessories', price: 490,   featured: false, image: IMG.lv_belt,        description: 'Classic LV Monogram reversible belt in black and brown.' },

  // ════════════════════════════════
  // CHANEL — 12 items
  // ════════════════════════════════
  { name: 'Classic Flap Bag',         brand: 'Chanel', category: 'Handbags',    price: 9800,  featured: true,  image: IMG.ch_classicflap, description: 'The Chanel Classic Flap in lambskin leather with gold-tone hardware.' },
  { name: 'Boy Chanel Bag',           brand: 'Chanel', category: 'Handbags',    price: 7800,  featured: true,  image: IMG.ch_boy,         description: 'The Boy Chanel in quilted calfskin with ruthenium-finish hardware.' },
  { name: 'Coco Handle Bag',          brand: 'Chanel', category: 'Handbags',    price: 6500,  featured: false, image: IMG.ch_cocohandle,  description: 'The Coco Handle in grained calfskin with top handle and chain strap.' },
  { name: '19 Flap Bag',              brand: 'Chanel', category: 'Handbags',    price: 5400,  featured: false, image: IMG.ch_19flap,      description: 'The Chanel 19 in soft lambskin with mixed metal chain.' },
  { name: 'Mini Flap Bag',            brand: 'Chanel', category: 'Handbags',    price: 4200,  featured: false, image: IMG.ch_miniflap,    description: 'Chanel Mini Flap in caviar leather — compact and iconic.' },
  { name: 'J12 Ceramic Watch',        brand: 'Chanel', category: 'Watches',     price: 6800,  featured: true,  image: IMG.ch_j12,         description: 'Chanel J12 in white high-tech ceramic with automatic movement.' },
  { name: 'Première Watch',           brand: 'Chanel', category: 'Watches',     price: 4900,  featured: false, image: IMG.ch_premiere,    description: 'Chanel Première in steel with black lacquered dial.' },
  { name: 'Diamond Tennis Bracelet',  brand: 'Chanel', category: 'Jewellery',   price: 8500,  featured: false, image: IMG.ch_tennis,      description: 'Elegant diamond tennis bracelet in 18k white gold.' },
  { name: 'Camellia Pearl Necklace',  brand: 'Chanel', category: 'Jewellery',   price: 4200,  featured: false, image: IMG.ch_camellia,    description: 'Chanel Camellia pearl necklace in 18k white gold with diamond accents.' },
  { name: 'Slingback Pumps',          brand: 'Chanel', category: 'Shoes',       price: 1150,  featured: false, image: IMG.ch_slingback,   description: 'Classic Chanel two-tone slingback pumps in grosgrain and lambskin.' },
  { name: 'Cap-Toe Ballet Flats',     brand: 'Chanel', category: 'Shoes',       price: 980,   featured: false, image: IMG.ch_ballet,      description: 'Chanel cap-toe ballet flats in lambskin with interlocking CC.' },

  // ════════════════════════════════
  // HERMÈS — 12 items
  // ════════════════════════════════
  { name: 'Birkin 30',                brand: 'Hermès', category: 'Handbags',    price: 24000, featured: true,  image: IMG.h_birkin30,     description: 'The Hermès Birkin 30 in Togo leather. The pinnacle of luxury craftsmanship.' },
  { name: 'Kelly 28',                 brand: 'Hermès', category: 'Handbags',    price: 18500, featured: true,  image: IMG.h_kelly,        description: 'The Hermès Kelly 28 in Epsom leather with palladium hardware.' },
  { name: 'Constance 24 Bag',         brand: 'Hermès', category: 'Handbags',    price: 16000, featured: true,  image: IMG.h_constance,    description: 'The Hermès Constance 24 in Epsom leather with iconic H clasp.' },
  { name: 'Picotin Lock 18',          brand: 'Hermès', category: 'Handbags',    price: 4100,  featured: false, image: IMG.h_picotin,      description: 'The Hermès Picotin Lock 18 in Clemence leather — casual luxury.' },
  { name: 'Birkin 25 Crocodile',      brand: 'Hermès', category: 'Handbags',    price: 68000, featured: true,  image: IMG.h_birkin25croc, description: 'Ultra-rare Hermès Birkin 25 in Niloticus crocodile leather.' },
  { name: 'Lindy 26 Bag',             brand: 'Hermès', category: 'Handbags',    price: 9800,  featured: false, image: IMG.h_lindy,        description: 'Hermès Lindy 26 in Clemence leather with double zip.' },
  { name: 'Cape Cod Watch',           brand: 'Hermès', category: 'Watches',     price: 5200,  featured: false, image: IMG.h_capecod,      description: 'Hermès Cape Cod watch in stainless steel with double tour leather strap.' },
  { name: 'Arceau Watch',             brand: 'Hermès', category: 'Watches',     price: 7800,  featured: false, image: IMG.h_arceau,       description: 'Hermès Arceau in 18k rose gold with alligator strap.' },
  { name: 'Collier de Chien Bracelet',brand: 'Hermès', category: 'Jewellery',   price: 2800,  featured: false, image: IMG.h_collier,      description: 'Hermès Collier de Chien bracelet in Epsom leather with palladium hardware.' },
  { name: 'Oran Sandals',             brand: 'Hermès', category: 'Shoes',       price: 890,   featured: false, image: IMG.h_oran,         description: 'Hermès Oran flat sandals in smooth calfskin with H cutout.' },
  { name: 'Silk Scarf 90cm',          brand: 'Hermès', category: 'Accessories', price: 450,   featured: false, image: IMG.h_scarf90,      description: 'Hermès 90cm silk twill scarf with hand-rolled edges.' },
  { name: 'Twilly Silk Scarf',        brand: 'Hermès', category: 'Accessories', price: 220,   featured: false, image: IMG.h_twilly,       description: 'Hermès Twilly in silk twill — versatile and iconic.' },

  // ════════════════════════════════
  // ROLEX — 12 items
  // ════════════════════════════════
  { name: 'Submariner Date',          brand: 'Rolex', category: 'Watches', price: 14500, featured: true,  image: IMG.r_sub,         description: 'The Rolex Submariner Date in Oystersteel. Water-resistant to 300m.' },
  { name: 'Datejust 41',              brand: 'Rolex', category: 'Watches', price: 12000, featured: false, image: IMG.r_datejust,    description: 'Rolex Datejust 41 in Oystersteel and yellow gold with fluted bezel.' },
  { name: 'Daytona Chronograph',      brand: 'Rolex', category: 'Watches', price: 35000, featured: true,  image: IMG.r_daytona,     description: 'Rolex Cosmograph Daytona in 18ct Everose gold.' },
  { name: 'GMT-Master II Pepsi',      brand: 'Rolex', category: 'Watches', price: 16800, featured: true,  image: IMG.r_gmt,         description: 'Rolex GMT-Master II in Oystersteel with Jubilee bracelet — Pepsi bezel.' },
  { name: 'Explorer II',              brand: 'Rolex', category: 'Watches', price: 13500, featured: false, image: IMG.r_explorer,    description: 'Rolex Explorer II in Oystersteel — built for extreme environments.' },
  { name: 'Sky-Dweller',              brand: 'Rolex', category: 'Watches', price: 48000, featured: false, image: IMG.r_skydweller,  description: 'Rolex Sky-Dweller in 18ct white gold with annual calendar.' },
  { name: 'Yacht-Master 42',          brand: 'Rolex', category: 'Watches', price: 22500, featured: false, image: IMG.r_yachtmaster, description: 'Rolex Yacht-Master 42 in Oystersteel with Oysterflex bracelet.' },
  { name: 'Milgauss',                 brand: 'Rolex', category: 'Watches', price: 11200, featured: false, image: IMG.r_milgauss,    description: 'Rolex Milgauss in Oystersteel — resistant to magnetic fields up to 1000 gauss.' },
  { name: 'Pearlmaster 39',           brand: 'Rolex', category: 'Watches', price: 55000, featured: false, image: IMG.r_pearlmaster, description: 'Rolex Pearlmaster 39 in 18ct Everose gold set with diamonds.' },
  { name: 'Datejust 31 Ladies',       brand: 'Rolex', category: 'Watches', price: 10500, featured: false, image: IMG.r_datejust31,  description: 'Rolex Datejust 31 in Oystersteel with diamond-set bezel.' },
  { name: 'Cosmograph Daytona',        brand: 'Rolex', category: 'Watches', price: 38000, featured: true,  image: IMG.r_cosmograph, description: 'Rolex Daytona in Oystersteel with black dial and tachymeter bezel.' },
  { name: 'Cellini Date',             brand: 'Rolex', category: 'Watches', price: 17200, featured: false, image: IMG.r_cellini2,    description: 'Rolex Cellini Date in 18k Everose gold with leather strap.' },

  // ════════════════════════════════
  // OMEGA — 4 Watches
  // ════════════════════════════════
  { name: 'Seamaster Diver 300M',     brand: 'Omega', category: 'Watches', price: 7200,  featured: true,  image: IMG.o_seamaster,    description: 'Omega Seamaster Diver 300M in stainless steel. Licensed by James Bond for underwater exploration.' },
  { name: 'Speedmaster Professional', brand: 'Omega', category: 'Watches', price: 6800,  featured: true,  image: IMG.o_speedmaster,  description: 'Omega Speedmaster Professional — the watch worn on the Moon in 1969.' },
  { name: 'Constellation Co-Axial',   brand: 'Omega', category: 'Watches', price: 5500,  featured: false, image: IMG.o_constellation, description: 'Omega Constellation in 18k gold with master chronometer certified calibre.' },
  { name: 'DeVille Prestige Watch',   brand: 'Omega', category: 'Watches', price: 4900,  featured: false, image: IMG.o_deville,      description: 'Omega DeVille Prestige dress watch in polished stainless steel.' },

  // ════════════════════════════════
  // TAG HEUER — 4 Watches
  // ════════════════════════════════
  { name: 'Carrera Chronograph',      brand: 'TAG Heuer', category: 'Watches', price: 4500,  featured: true,  image: IMG.t_carrera,    description: 'TAG Heuer Carrera chronograph — iconic racing watch in stainless steel.' },
  { name: 'Aquaracer Professional',   brand: 'TAG Heuer', category: 'Watches', price: 3800,  featured: true,  image: IMG.t_aquaracer,  description: 'TAG Heuer Aquaracer Professional diving watch. Water-resistant to 300m.' },
  { name: 'Monaco Automatic',         brand: 'TAG Heuer', category: 'Watches', price: 6500,  featured: false, image: IMG.t_monaco,     description: 'TAG Heuer Monaco — legendary square chronograph associated with Steve McQueen.' },
  { name: 'Formula 1 Quartz',         brand: 'TAG Heuer', category: 'Watches', price: 2200,  featured: false, image: IMG.t_formula,    description: 'TAG Heuer Formula 1 sports watch with quartz movement and steel case.' },

  // ════════════════════════════════
  // BREITLING — 4 Watches
  // ════════════════════════════════
  { name: 'Navitimer Automatic',      brand: 'Breitling', category: 'Watches', price: 8500,  featured: true,  image: IMG.b_navitimer,   description: 'Breitling Navitimer — classic pilot watch with circular slide rule.' },
  { name: 'Superocean Heritage II',   brand: 'Breitling', category: 'Watches', price: 5800,  featured: true,  image: IMG.b_superocean,  description: 'Breitling Superocean Heritage II — retro-style diving watch with 42mm case.' },
  { name: 'Chronomat Chronograph',    brand: 'Breitling', category: 'Watches', price: 7200,  featured: false, image: IMG.b_chronomat,   description: 'Breitling Chronomat automatic chronograph with rotating bezel.' },
  { name: 'Avenger Chronograph',      brand: 'Breitling', category: 'Watches', price: 4800,  featured: false, image: IMG.b_avenger,     description: 'Breitling Avenger professional chronograph — rugged and reliable.' },

  // ════════════════════════════════
  // CARTIER — 4 Watches
  // ════════════════════════════════
  { name: 'Tank Française',           brand: 'Cartier', category: 'Watches', price: 5200,  featured: true,  image: IMG.c_tank,        description: 'Cartier Tank Française — quintessential Art Deco dress watch in 18k gold.' },
  { name: 'Santos-Dumont Watch',      brand: 'Cartier', category: 'Watches', price: 4800,  featured: true,  image: IMG.c_santos,      description: 'Cartier Santos-Dumont — named after aviation pioneer Alberto Santos-Dumont.' },
  { name: 'Ballon Bleu 42mm',         brand: 'Cartier', category: 'Watches', price: 5900,  featured: false, image: IMG.c_ballon,      description: 'Cartier Ballon Bleu with sapphire cabochon crown and automatic calibre.' },
  { name: 'Panthère de Cartier',      brand: 'Cartier', category: 'Watches', price: 4600,  featured: false, image: IMG.c_pantherre,   description: 'Cartier Panthère women\'s watch in 18k gold with Cartier\'s iconic cougar motif.' },

  // ════════════════════════════════
  // GUCCI — 12 items
  // ════════════════════════════════
  { name: 'GG Marmont Shoulder Bag',  brand: 'Gucci', category: 'Handbags',    price: 1450,  featured: false, image: IMG.g_marmont,    description: 'Gucci GG Marmont small shoulder bag in matelassé chevron leather.' },
  { name: 'Dionysus GG Supreme Bag',  brand: 'Gucci', category: 'Handbags',    price: 2100,  featured: true,  image: IMG.g_dionysus,   description: 'Gucci Dionysus in GG Supreme canvas with tiger head closure.' },
  { name: 'Horsebit 1955 Bag',        brand: 'Gucci', category: 'Handbags',    price: 3200,  featured: true,  image: IMG.g_horsebit,   description: 'Gucci Horsebit 1955 small bag in GG Supreme canvas.' },
  { name: 'Ophidia GG Tote',          brand: 'Gucci', category: 'Handbags',    price: 1680,  featured: false, image: IMG.g_ophidia,    description: 'Gucci Ophidia large tote in GG Supreme canvas with Web detail.' },
  { name: 'Jackie 1961 Bag',          brand: 'Gucci', category: 'Handbags',    price: 1950,  featured: false, image: IMG.g_jackie,     description: 'Gucci Jackie 1961 small hobo bag in leather.' },
  { name: 'Ace Leather Sneakers',     brand: 'Gucci', category: 'Shoes',       price: 680,   featured: false, image: IMG.g_ace,        description: 'Gucci Ace leather sneakers with Web stripe detail.' },
  { name: 'Princetown Loafers',       brand: 'Gucci', category: 'Shoes',       price: 890,   featured: false, image: IMG.g_princetown, description: 'Gucci Princetown leather mule with horsebit detail.' },
  { name: 'Rhyton Sneakers',          brand: 'Gucci', category: 'Shoes',       price: 750,   featured: false, image: IMG.g_rhyton,     description: 'Gucci Rhyton leather sneakers with vintage logo.' },
  { name: 'G-Timeless Watch',         brand: 'Gucci', category: 'Watches',     price: 1950,  featured: false, image: IMG.g_gtimeless,  description: 'Gucci G-Timeless watch in stainless steel with bee motif dial.' },
  { name: 'Interlocking G Necklace',  brand: 'Gucci', category: 'Jewellery',   price: 980,   featured: false, image: IMG.g_necklace,   description: 'Gucci Interlocking G necklace in 18k yellow gold.' },
  { name: 'GG Marmont Belt',          brand: 'Gucci', category: 'Accessories', price: 450,   featured: false, image: IMG.g_belt,       description: 'Gucci GG Marmont wide belt in black leather with double G buckle.' },
  { name: 'Flora GG Silk Scarf',      brand: 'Gucci', category: 'Accessories', price: 380,   featured: false, image: IMG.g_scarf,      description: 'Gucci Flora GG silk scarf with iconic floral print.' },

  // ════════════════════════════════
  // PRADA — 12 items
  // ════════════════════════════════
  { name: 'Saffiano Leather Tote',    brand: 'Prada', category: 'Handbags',    price: 2200,  featured: false, image: IMG.p_saffiano,   description: 'Prada Saffiano leather tote with gold-tone hardware.' },
  { name: 'Re-Edition 2005 Bag',      brand: 'Prada', category: 'Handbags',    price: 1450,  featured: true,  image: IMG.p_reedition,  description: 'Prada Re-Edition 2005 nylon shoulder bag — iconic and lightweight.' },
  { name: 'Galleria Medium Bag',      brand: 'Prada', category: 'Handbags',    price: 3100,  featured: true,  image: IMG.p_galleria,   description: 'Prada Galleria medium bag in Saffiano leather with double zip.' },
  { name: 'Cleo Shoulder Bag',        brand: 'Prada', category: 'Handbags',    price: 2650,  featured: false, image: IMG.p_cleo,       description: 'Prada Cleo brushed leather shoulder bag with arc shape.' },
  { name: 'Cahier Bag',               brand: 'Prada', category: 'Handbags',    price: 2900,  featured: false, image: IMG.p_cahier,     description: 'Prada Cahier bag in Saffiano and city calf leather.' },
  { name: 'Symbole Bag',              brand: 'Prada', category: 'Handbags',    price: 1980,  featured: false, image: IMG.p_symbole,    description: 'Prada Symbole medium bag in Saffiano leather with triangle logo.' },
  { name: 'Monolith Boots',           brand: 'Prada', category: 'Shoes',       price: 1650,  featured: false, image: IMG.p_monolith,   description: 'Prada Monolith brushed leather boots with lug sole.' },
  { name: 'Cloudbust Sneakers',       brand: 'Prada', category: 'Shoes',       price: 890,   featured: false, image: IMG.p_cloudbust,  description: 'Prada Cloudbust Thunder knit sneakers with chunky sole.' },
  { name: 'Block Heel Sandals',       brand: 'Prada', category: 'Shoes',       price: 1100,  featured: false, image: IMG.p_blockheel,  description: 'Prada block heel sandals in satin with crystal embellishment.' },
  { name: 'Triangle Logo Necklace',   brand: 'Prada', category: 'Jewellery',   price: 780,   featured: false, image: IMG.p_necklace,   description: 'Prada triangle logo necklace in sterling silver.' },
  { name: 'Saffiano Belt',            brand: 'Prada', category: 'Accessories', price: 420,   featured: false, image: IMG.p_belt,       description: 'Prada Saffiano leather belt with triangle logo buckle.' },
  { name: 'Re-Nylon Bucket Hat',      brand: 'Prada', category: 'Accessories', price: 380,   featured: false, image: IMG.p_hat,        description: 'Prada Re-Nylon bucket hat with triangle logo patch.' },

  // ════════════════════════════════
  // DYSON — 30 items (Electronics)
  // ════════════════════════════════

  // Hair Care
  { name: 'Dyson Airwrap Complete',              brand: 'Dyson', category: 'Electronics', price: 600,  featured: true,  image: IMG.dy_airwrap,    description: 'Dyson Airwrap multi-styler with Coanda airflow. Styles, waves, curls and dries simultaneously without extreme heat.' },
  { name: 'Dyson Airwrap Long Barrel Set',       brand: 'Dyson', category: 'Electronics', price: 650,  featured: false, image: IMG.dy_airwrap,    description: 'Dyson Airwrap with long barrels for longer hair — creates defined curls and waves.' },
  { name: 'Dyson Supersonic Hair Dryer',         brand: 'Dyson', category: 'Electronics', price: 430,  featured: true,  image: IMG.dy_supersonic, description: 'Dyson Supersonic in Vinca Blue/Rosé. Intelligent heat control for shine, not damage.' },
  { name: 'Dyson Supersonic Nural',              brand: 'Dyson', category: 'Electronics', price: 480,  featured: false, image: IMG.dy_supersonic, description: 'Dyson Supersonic Nural — senses hair type and adjusts heat automatically.' },
  { name: 'Dyson Corrale Straightener',          brand: 'Dyson', category: 'Electronics', price: 500,  featured: false, image: IMG.dy_corrale,    description: 'Dyson Corrale cordless straightener with flexing plates for less heat damage.' },
  { name: 'Dyson Airstrait Straightener',        brand: 'Dyson', category: 'Electronics', price: 500,  featured: false, image: IMG.dy_airstrait,  description: 'Dyson Airstrait — straightens wet or dry hair with airflow, not heat plates.' },
  { name: 'Dyson Airwrap Diffuser Edition',      brand: 'Dyson', category: 'Electronics', price: 560,  featured: false, image: IMG.dy_airwrap,    description: 'Dyson Airwrap with diffuser attachment — perfect for curly and wavy hair types.' },

  // Vacuums — Cordless
  { name: 'Dyson V15 Detect Absolute',           brand: 'Dyson', category: 'Electronics', price: 750,  featured: true,  image: IMG.dy_v15,        description: 'Dyson V15 Detect with laser dust detection, HEPA filtration and LCD screen.' },
  { name: 'Dyson V12 Detect Slim',               brand: 'Dyson', category: 'Electronics', price: 580,  featured: false, image: IMG.dy_v12,        description: 'Dyson V12 Detect Slim — powerful, lightweight cordless vacuum with laser.' },
  { name: 'Dyson V11 Absolute',                  brand: 'Dyson', category: 'Electronics', price: 500,  featured: false, image: IMG.dy_v11,        description: 'Dyson V11 Absolute with intelligent suction and LCD screen.' },
  { name: 'Dyson V10 Animal',                    brand: 'Dyson', category: 'Electronics', price: 420,  featured: false, image: IMG.dy_v10,        description: 'Dyson V10 Animal — powerful suction for homes with pets.' },
  { name: 'Dyson Omni-Glide Vacuum',             brand: 'Dyson', category: 'Electronics', price: 380,  featured: false, image: IMG.dy_omni,       description: 'Dyson Omni-Glide cordless vacuum — moves in all directions on hard floors.' },
  { name: 'Dyson Gen5detect Absolute',           brand: 'Dyson', category: 'Electronics', price: 900,  featured: true,  image: IMG.dy_gen5,       description: 'Dyson Gen5detect — most powerful cordless vacuum ever made with HEPA filtration.' },

  // Vacuums — Robot
  { name: 'Dyson 360 Vis Nav Robot',             brand: 'Dyson', category: 'Electronics', price: 1200, featured: true,  image: IMG.dy_robot,      description: 'Dyson 360 Vis Nav robot vacuum with 360° vision and full-width brush bar.' },
  { name: 'Dyson 360 Heurist Robot',             brand: 'Dyson', category: 'Electronics', price: 900,  featured: false, image: IMG.dy_robot,      description: 'Dyson 360 Heurist robot vacuum with intelligent mapping and HEPA filter.' },

  // Air Purifiers & Fans
  { name: 'Dyson Purifier Cool TP09',            brand: 'Dyson', category: 'Electronics', price: 650,  featured: true,  image: IMG.dy_purifier,   description: 'Dyson Purifier Cool — HEPA+Carbon filtration with 350° oscillation and app control.' },
  { name: 'Dyson Purifier Hot+Cool HP09',        brand: 'Dyson', category: 'Electronics', price: 750,  featured: false, image: IMG.dy_purifier,   description: 'Dyson HP09 purifies, heats and cools with real-time air quality display.' },
  { name: 'Dyson Purifier Big+Quiet BP02',       brand: 'Dyson', category: 'Electronics', price: 900,  featured: false, image: IMG.dy_purifier,   description: 'Dyson Big+Quiet — large room purifier with whisper-quiet operation.' },
  { name: 'Dyson Purifier Humidify+Cool PH04',   brand: 'Dyson', category: 'Electronics', price: 850,  featured: false, image: IMG.dy_purifier,   description: 'Dyson PH04 purifies, humidifies and cools — UV-C sterilisation of water.' },
  { name: 'Dyson Cool AM07 Tower Fan',           brand: 'Dyson', category: 'Electronics', price: 450,  featured: false, image: IMG.dy_fan,        description: 'Dyson Cool AM07 bladeless tower fan — smooth, powerful airflow.' },
  { name: 'Dyson Hot+Cool AM09 Fan Heater',      brand: 'Dyson', category: 'Electronics', price: 500,  featured: false, image: IMG.dy_fan,        description: 'Dyson AM09 fan heater — heats a room fast in winter, cools in summer.' },

  // Lighting
  { name: 'Dyson Lightcycle Morph Desk',         brand: 'Dyson', category: 'Electronics', price: 850,  featured: false, image: IMG.dy_lamp,       description: 'Dyson Lightcycle Morph desk lamp — tracks local daylight and adjusts automatically.' },
  { name: 'Dyson Lightcycle Morph Floor',        brand: 'Dyson', category: 'Electronics', price: 1100, featured: false, image: IMG.dy_lamp,       description: 'Dyson Lightcycle Morph floor lamp — 4 light modes, 60 year LED lifespan.' },
  { name: 'Dyson Lightcycle Task Light',         brand: 'Dyson', category: 'Electronics', price: 650,  featured: false, image: IMG.dy_lamp,       description: 'Dyson Lightcycle task light — personalised lighting based on age and activity.' },

  // Headphones
  { name: 'Dyson Zone Air-Purifying Headphones', brand: 'Dyson', category: 'Electronics', price: 950,  featured: true,  image: IMG.dy_zone,       description: 'Dyson Zone — world first air-purifying headphones with active noise cancellation.' },

  // Accessories & Attachments
  { name: 'Dyson Airwrap Paddle Brush',          brand: 'Dyson', category: 'Electronics', price: 80,   featured: false, image: IMG.dy_accessory,  description: 'Dyson Airwrap paddle brush attachment — smooths and straightens while drying.' },
  { name: 'Dyson V15 Laser Slim Fluffy Head',    brand: 'Dyson', category: 'Electronics', price: 90,   featured: false, image: IMG.dy_accessory,  description: 'Dyson laser slim fluffy cleaner head — reveals invisible dust on hard floors.' },
  { name: 'Dyson Hair Screw Tool',               brand: 'Dyson', category: 'Electronics', price: 50,   featured: false, image: IMG.dy_accessory,  description: 'Dyson hair screw tool — removes tangled hair from brush bar automatically.' },
  { name: 'Dyson Supersonic Gift Edition',       brand: 'Dyson', category: 'Electronics', price: 520,  featured: true,  image: IMG.dy_supersonic, description: 'Dyson Supersonic in special Ceramic Pink/Rose Gold — luxury gift edition with presentation case.' },
  { name: 'Dyson Airwrap Gift Edition',          brand: 'Dyson', category: 'Electronics', price: 700,  featured: true,  image: IMG.dy_airwrap,    description: 'Dyson Airwrap Complete in Vinca Blue/Rosé — limited gift edition with presentation case.' },

];

async function seedProducts() {
  const Product = require('./src/models/Product');
  await Product.deleteMany({});
  const DEFAULT_IMG = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80';
  const withDefaults = PRODUCTS_SEED.map(p => ({ ...p, image: p.image || DEFAULT_IMG }));
  try {
    await Product.insertMany(withDefaults, { ordered: false });
  } catch(e) { console.log('Seed warning:', e.message.slice(0,100)); }
  const count = await Product.countDocuments();
  console.log('Products seeded: ' + count);
}

async function seedAdmin() {
  const Admin = require('./src/models/Admin');
  const exists = await Admin.findOne({ email: 'admin@luxe.com' });
  if (exists) {
    console.log('✅ Admin already exists — skipping seed');
    return;
  }
  await Admin.create({
    name:     'LUXE Admin',
    email:    'admin@luxe.com',
    password: 'admin@luxe123',
    phone:    '+91 9000000000',
    role:     'superadmin',
    isActive: true,
    permissions: {
      manageOrders:   true,
      manageBuyers:   true,
      manageBrands:   true,
      manageProducts: true,
      viewReports:    true,
    },
  });
  console.log('✅ Admin seeded — admin@luxe.com / admin@luxe123');
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    await seedAdmin();
    await seedProducts();
    app.listen(PORT, () => console.log(`✅ LUXE server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
