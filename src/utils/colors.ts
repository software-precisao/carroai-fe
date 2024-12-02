const colors = {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f5f5f5',
    text: '#333',
    danger: '#e74c3c',
  } as const;
  
  export type ColorKeys = keyof typeof colors;
  
  export default colors;
  