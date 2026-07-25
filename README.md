# Asteria Apartments

Static website for Asteria Apartments — a holiday rental property in Νιμπορειό, Νότια Εύβοια.

## Features

- Responsive dark-green luxury design
- Exterior photo gallery with lightbox (prev/next, keyboard, swipe)
- Booking enquiry form — sends a pre-filled WhatsApp message
- Night-count calculator in the booking form
- Guest review submission form
- Configurable links to external booking platforms (Booking.com, Airbnb, direct)
- SVG favicon and image fallback branding

## Configuration

### Images

Edit **`site-config.js`** — every image path lives there:

```js
var SITE_CONFIG = {
  images: {
    hero:    "images/exterior-01.jpg",  // full-screen hero background
    about:   "images/exterior-01.jpg",  // about section
    offers:  "images/exterior-01.jpg",  // offers section background
    footer:  "images/exterior-05.jpg",  // footer background
    gallery: [                          // gallery grid (order = display order)
      { src: "images/exterior-01.jpg", alt: "..." },
      ...
    ],
    rooms: [                            // room card images (must match HTML order)
      { src: "images/exterior-02.jpg", alt: "..." },
      ...
    ],
  },
  ...
};
```

Upload new photos to the `images/` folder and update the paths above.

### Contact details

Also in **`site-config.js`** under `contact`:

```js
contact: {
  phone:        "+30 694 788 3098",
  whatsapp:     "+30 693 696 0328",
  whatsappHref: "https://wa.me/306936960328",
  email:        "info@example.gr",
  mapsUrl:      "https://maps.app.goo.gl/...",
  ...
}
```

### Social links

Set Instagram / Facebook / TikTok URLs in `site-config.js → social`. An empty string hides the link.

### Booking platform links

Edit **`booking-config.js`**. An empty string hides that platform's card:

```js
var BOOKING_CONFIG = {
  bookingCom: "",        // set to your Booking.com listing URL to show
  airbnb:     "",        // set to your Airbnb listing URL to show
  direct:     "#booking", // keeps the direct-booking link visible
};
```

## Technologies

- HTML · CSS · JavaScript (no build step)
- Hosted on [Vercel](https://vercel.com)