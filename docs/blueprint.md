# **App Name**: PrintPro Digital

## Core Features:

- Smart Contact Form: Handles file uploads, validates inputs, sorts files into Cloud Storage folders (flex, sav, windowgraphics), and generates unique Order Reference IDs.
- Instant Notifications: Sends emails with customer details and a direct WhatsApp Chat Link to the admin, plus a branded confirmation email to the customer.
- Order Reference Suggestion Tool: Suggest a probable reference name for the media file. This feature analyzes the customer details provided in the contact form and provides probable reference names to be attached to the customer files. A Language Model is used as a tool to determine when customer input is related to information in their files, to enhance suggestion quality and relevance.
- Image Gallery: Display a gallery of large format printing examples.
- Client Testimonials: Showcase client testimonials to build trust and credibility.
- Contact Form Submission to Firestore: Store contact form submissions securely in Firebase Firestore (`submissions` collection).

## Style Guidelines:

- Primary color: Deep blue (#4659cd) to convey trust and professionalism, aligned with the 'Primary Blue' palette described by the user.
- Background color: Light blue (#f0f3fc), providing a subtle background tint as per the user's 'Primary Blue' palette.
- Accent color: A vibrant shade of violet (#8263DA), positioned slightly to the 'left' on the color wheel. A more saturated, brighter complement to the Deep Blue.
- Font: 'Inter' (sans-serif), consistent with the original design.
- Note: currently only Google Fonts are supported.
- Use 'Lucide React' icons, maintaining clean, consistent SVG line icons for UI elements, in line with user suggestion.
- Apply subtle animations for interactive elements and transitions.
- Utilize Glassmorphism in the Navbar for a modern, sticky header effect.