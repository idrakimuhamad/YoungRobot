export function toggleExpanded() {
  return (dispatch, getState) => {
  dispatch ({
        type: 'TOGGLE_NAVIGATION_EXPANDED'
    });
  }
}
