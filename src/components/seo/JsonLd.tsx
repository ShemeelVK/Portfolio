import { Person, WithContext } from 'schema-dts'

export default function JsonLd() {
  const jsonLd: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shemeel Sakeer',
    url: 'https://shemeel-portfolio.vercel.app',
    image: 'https://shemeel-portfolio.vercel.app/profile.png',
    sameAs: [
      'https://github.com/ShemeelVK',
      'https://www.linkedin.com/in/shemeel-sakeer',
      'https://twitter.com/ShemeelVK', // Add correctly if known
      'https://instagram.com/shemeel'  // Add correctly if known, removing placeholders
    ],
    jobTitle: 'Full Stack .NET Engineer',
    description: 'Specializing in .NET Core, React, and building scalable enterprise-grade web applications.',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance / Open to Work'
    },
    knowsAbout: ['C#', '.NET Core', 'React', 'TypeScript', 'SQL Server', 'Clean Architecture']
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
