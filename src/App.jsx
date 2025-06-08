import { useState, useCallback } from "react"
import Filter from "./components/Filter"
import ToDoLists from "./components/ToDoLists"

function App() {
  const [filters, setFilters] = useState({})
  const [sortOption, setSortOption] = useState("createdAt")

  // useCallback ile fonksiyon referansları sabitlenir
  const handleFilterChange = useCallback((filters) => {
    setFilters(filters)
  }, [])

  const handleSortChange = useCallback((sort) => {
    setSortOption(sort)
  }, [])

  return (
    <div>
      <ToDoLists filters={filters} sortOption={sortOption} />

    </div>
  )
}

export default App
