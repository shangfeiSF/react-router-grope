import React from 'react'

import IndexSidebar from './public/IndexSidebar'
import Index from './public/Index'

export default ({content, sidebar}) => (
  <div>
    <div className="Sidebar">
      {sidebar || <IndexSidebar />}
    </div>
    <div className="Content">
      {content || <Index />}
    </div>
  </div>
)
