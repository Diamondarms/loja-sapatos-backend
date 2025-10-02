// Cliente
export interface CustomerModel {
    customer_id: number;               // Chave primária
    name: string;                     // Não nulo
    cpf: string;                      // CHAR(11), único
    phone: string | null;                // Opcional
    cep: string;                      // Não nulo
}

// Fornecedor
export interface SupplierModel {
    supplier_id: number;            // Chave primária
    name: string;                     // Não nulo
    cnpj: string;                     // CHAR(14), único
    phone: string | null;                // Opcional
}

// Categoria
export interface CategoryModel {
    category_id: number;             // Chave primária
    name: string;                     // Não nulo
}

// Produto
export interface ProductModel {
    product_id: number;               // Chave primária
    name: string;                     // Não nulo
    category_id: number;             // FK → Categoria
    size: string;                   // Não nulo
    stock: number;                  // Não nulo
    sale_price: number;             // NUMERIC(10,2), >= purchase_price
    purchase_price: number;         // NUMERIC(10,2), >= 0
    supplier_id: number;            // FK → Fornecedor
}

// Venda
export interface SaleModel {
    sale_id: number;                 // Chave primária
    sale_date: string;                // Timestamp, não nulo
    customer_id: number;               // FK → Cliente
}

// ItemVenda
export interface ItemSaleModel {
    item_sale_id: number;            // Chave primária
    sale_id: number;                  // FK → Venda
    product_id: number;                // FK → Produto
    quantity: number;                // > 0
}



export enum PaymentMethod {
  DINHEIRO = 'dinheiro',
  CARTAO = 'cartao',
  PIX = 'pix',
  BOLETO = 'boleto',
}

// Metodo
export interface MethodModel {
    method_id: number;                 // Chave primária
    name: PaymentMethod;              // Enum
}

// Pagamento
export interface PaymentModel {
    payment_id: number;              // Chave primária
    method_id: number;                  // FK → Metodo
    sale_id: number;                   // FK → Venda
}


/// OUTROS

export interface ItemSalePayload {
    product_id: number;
    quantity: number;
}