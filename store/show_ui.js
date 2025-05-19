export const state = () => ({
    activeMap: false,
    activeFilters: false,
})

export const mutations = {
    setActiveMap(state, value)
    {
        state.activeMap = value
    },
    setActiveFilters(state, value)
    {
        state.activeFilters = value
    },
}

export const getters = {
    getActiveMap: ({activeMap}) => activeMap,
    getActiveFilters: ({activeFilters}) => activeFilters,
}
