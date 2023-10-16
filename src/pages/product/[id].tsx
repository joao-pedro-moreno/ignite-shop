import { ImageContainer, ProductContainer, ProductDetails, SkeletonImageContainer, SkeletonPrice, SkeletonProductDetails, SkeletonTitle } from "../../styles/pages/product"
import Image from "next/image"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { isFallback } = useRouter()

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
    }
  }

  if (isFallback) {
    return (
      <ProductContainer>
        <SkeletonImageContainer />

        <SkeletonProductDetails>
          <SkeletonTitle />

          <SkeletonPrice />
        </SkeletonProductDetails>
      </ProductContainer>
    )
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>

      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_ON7NAHThzg2UaT' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props:{
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}