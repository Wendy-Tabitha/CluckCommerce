// Product type definitions for reference
// ProductType: 'alive-chicken' | 'slaughtered-meat' | 'eggs'
// Freshness: 'today' | 'yesterday' | '2-days-ago'

// Product structure:
// {
//   id: string;
//   name: string;
//   description: string;
//   longDescription: string;
//   images: string[];
//   price: number;
//   type: ProductType;
//   stock: number;
//   weight?: number; // in kg for chicken
//   quantity?: number; // for eggs (e.g., 6, 12, 30)
//   freshness?: Freshness; // for eggs
//   featured?: boolean;
// }

// CartItem structure:
// {
//   product: Product;
//   quantity: number;
// }
