global.COURSES = [
  {
    id: 0,
    name: 'JavaScript',
    grade: 'A',
    notices: [{
      id: 0,
      title: 'This is a base course for JSer',
      content: 'You can learn more about how to use Javascript to build a web-page.'
    }, {
      id: 1,
      title: 'All the JSers need to learn JavaScript by coding in practice',
      content: 'More coding, more thinking and the more skills you got it.'
    }],
    lessons: [{
      id: 0,
      title: 'What is DOM',
      content: 'DOM is the original element of web-page.',
      weight: '5%'
    }, {
      id: 1,
      title: 'How to use Array',
      content: 'Array can be sorted and be splited and so on.',
      weight: '2%'
    }]
  },

  {
    id: 1,
    name: 'React',
    grade: 'A',
    notices: [{
      id: 0,
      title: 'React is a MMVC lib for advanced JSer',
      content: 'Learn more about React like react-router and reflux.'
    }, {
      id: 1,
      title: 'React-router is a good helper for App based on React',
      content: 'React-router has a lot of base knowledge needed to learn by heart.'
    }],
    lessons: [{
      id: 0,
      title: 'Use JSX to code',
      content: 'JSX is a concise and familiar syntax for defining tree structures with attributes.',
      weight: '6%'
    }, {
      id: 1,
      title: 'Webpack is a good helper for React',
      content: 'Webpack is a flexible module bundler.',
      weight: '3%'
    }]
  }
]