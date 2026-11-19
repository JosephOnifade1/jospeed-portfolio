// The homepage graph belongs only to the portfolio landing page.
export const homeSchema = (origin) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${origin}/#person`,
      name: 'Joseph Onifade',
      alternateName: [
        'Joseph Onifade',
        'JOspeed',
        'Jospeed',
        'buildwithjospeed',
        'Build With JOspeed',
        'JosephOnifade1',
      ],
      description:
        'Joseph Onifade, known online as JOspeed, is a full-stack developer and AI engineer based in Lagos, Nigeria. He builds high-quality React, Supabase, n8n and AI-powered web products for startups and businesses globally. Available for freelance contracts via Upwork.',
      url: origin,
      image: `${origin}/profile.jpg`,
      jobTitle: 'Full-Stack Developer & AI Engineer',
      knowsAbout: [
        'React',
        'TypeScript',
        'Supabase',
        'Node.js',
        'n8n',
        'Voiceflow',
        'AI Automation',
        'Web Development',
        'No-Code Development',
        'Bubble',
        'FlutterFlow',
        'Lovable',
        'Blender',
        'Three.js',
        'PostgreSQL',
        'Vercel',
        'Netlify',
        'Chatbot Development',
        'LLM Integration',
        'RAG Systems',
        'Vapi',
        'OpenAI API',
        'Full-Stack MVP Development',
        'SaaS Architecture from Scratch',
        'React and Supabase Web Application Architecture',
        'AI Voice Agent Integration',
        'Figma to React Production Code',
        'Async Remote Software Development',
        'Database Schema Design and RLS',
      ],
      nationality: { '@type': 'Country', name: 'Nigeria' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
      email: 'josephonifade21@gmail.com',
      sameAs: [
        'https://github.com/JosephOnifade1',
        'https://www.linkedin.com/in/joseph-onifade-ol',
        'https://x.com/buildwithjospeed',
        'https://www.upwork.com/freelancers/~01a476791ed9f8b084',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'JOspeed',
        url: origin,
      },
    },

    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: origin,
      name: 'JOspeed — Build With JOspeed',
      description:
        'Portfolio of Joseph Onifade, full-stack developer and AI engineer based in Lagos, Nigeria.',
      author: { '@id': `${origin}/#person` },
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },

    {
      '@type': 'ProfessionalService',
      '@id': `${origin}/#service`,
      name: 'JOspeed — Full-Stack Development & AI Engineering',
      url: origin,
      description:
        'Professional full-stack web development and AI engineering services for startups and businesses. Specializing in React, Supabase, n8n workflows, AI chatbots and voice agents.',
      provider: { '@id': `${origin}/#person` },
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'Netherlands' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Nigeria' },
        { '@type': 'AdministrativeArea', name: 'Worldwide' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'josephonifade21@gmail.com',
        contactType: 'sales',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '22:00',
        },
      },
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${origin}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${origin}/#projects` },
        { '@type': 'ListItem', position: 3, name: 'Contact', item: `${origin}/#contact` },
      ],
    },

    {
      '@type': 'FAQPage',
      '@id': `${origin}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is JOspeed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'JOspeed is the online alias and studio brand of Joseph Onifade, a full-stack developer and AI engineer based in Lagos, Nigeria. He builds React, Supabase, n8n and AI-powered web products for clients in the US, UK, Canada, UAE and globally.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I hire a full-stack developer to build an MVP from scratch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Joseph Onifade specializes in turning product concepts and Figma designs into production-ready MVPs for early-stage startups and founders using React, Supabase, and n8n.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I hire JOspeed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can hire Joseph Onifade directly through his portfolio at buildwithjospeed.vercel.app, via email at josephonifade21@gmail.com, or through his Upwork profile for escrow-protected contracts.',
          },
        },
      ],
    },

    {
      '@type': 'WebPage',
      '@id': `${origin}/#webpage`,
      url: `${origin}/`,
      name: 'Joseph Onifade (JOspeed) — Full-Stack Developer & AI Engineer',
      isPartOf: { '@id': `${origin}/#website` },
      about: { '@id': `${origin}/#person` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#hero-headline', '#hero-sub', '#about', '#contact'],
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${origin}/og-image.png`,
        width: 1847,
        height: 851,
      },
    },
  ],
});
