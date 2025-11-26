export interface Theme {
  colors: {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
    accentHover: string;
    error: string;
    success: string;
    warning: string;
  };
  
  spacing: (multiplier: number) => string;
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  font: {
    family: string;
    size: {
      sm: string;
      md: string;
      lg: string;
    };
    weight: {
      regular: number;
      medium: number;
      bold: number;
    };
  };
}

export const theme: Theme = {
  colors: {
    background: "linear-gradient(to top, #030722, #505ca8ff);",
    surface: "#0a0f2e", 
    text: "#ffffff",
    textMuted: "#8b9bb5", 
    border: "#1a2347", 
    accent: "#f5df4d",
    accentHover: "#d9c542",
    error: "#ff6b6b",
    success: "#51cf66",
    warning: "#ffd43b"
  },
  spacing: (f: number) => `${f * 8}px`,
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px"
  },
  font: {
    family: "'Inter', system-ui, sans-serif",
    size: {
      sm: "14px",
      md: "15px",
      lg: "18px"
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 600
    }
  }
};