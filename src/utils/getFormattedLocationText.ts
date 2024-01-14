import { Location } from "../types/locationIQ";

// Check if the type is 'city' and there is a state
export const getFormattedLocationText = (item: Location) => {
  let location = item.address.name;
  if ( item.type === 'city' && item.address.state)
  // Append the state to the location with a comma and space
    location += ', ' + item.address.state;
  return location;

};