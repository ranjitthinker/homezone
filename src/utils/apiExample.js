// Example usage of the API service
// This file demonstrates how to use the common axios instance

import { propertyApi, exampleApi } from '../services/api';

// Example React component using the API service
export const ExampleComponent = () => {
  // Function to fetch and display properties
  const fetchProperties = async () => {
    try {
      const response = await propertyApi.getProperties({
        page: 1,
        limit: 10,
        type: 'apartment'
      });
      
      
      return response.data;
    } catch (error) {
      
      // Handle error (show toast, redirect, etc.)
    }
  };
  
  // Function to create a new property
  const createProperty = async (propertyData) => {
    try {
      const response = await propertyApi.createItem(propertyData);
      
      return response.data;
    } catch (error) {
      
      throw error;
    }
  };
  
  // Function to upload a property image
  const uploadPropertyImage = async (file) => {
    try {
      const response = await propertyApi.uploadFile(file);
      
      return response.data;
    } catch (error) {
      
      throw error;
    }
  };
  
  return {
    fetchProperties,
    createProperty,
    uploadPropertyImage
  };
};

// Example usage in a Next.js page component:
// import { ExampleComponent } from '../utils/apiExample';
// import { useEffect } from 'react';
// 
// export default function HomePage() {
//   const { fetchProperties } = ExampleComponent();
//   
//   useEffect(() => {
//     fetchProperties().then(properties => {
//       // Set properties in state
//     });
//   }, []);
//   
//   return (
//     <div>
//       Your component JSX here
//     </div>
//   );
// }

export default ExampleComponent;
