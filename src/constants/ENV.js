const isDevelopment = process.env.NODE_ENV === "development";

export const ENV = isDevelopment
  ? {
      imageServicesUrl: "https://sepetinbackend.caneryayla.com",
    }
  : {
      imageServicesUrl: "https://sepetinbackend.caneryayla.com",
    };
