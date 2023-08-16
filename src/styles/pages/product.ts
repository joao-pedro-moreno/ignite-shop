import { styled } from "..";

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 'calc(656px - 0.5rem)',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: 'medium',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor: '$green300',
    },
  },
})

export const SkeletonImageContainer = styled('div', {
  width: 576,
  maxWidth: 576,
  height: 'calc(656px - 0.5rem)',
  background: '$gray800',
  borderRadius: 8,
  padding: '0.25rem',
})

export const SkeletonProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const SkeletonTitle = styled('div', {
  width: '100%',
  height: '2rem',
  background: '$gray800',
  borderRadius: 8,
})

export const SkeletonPrice = styled('div', {
  marginTop: '1rem',
  width: '35%',
  height: '2rem',
  background: '$gray800',
  borderRadius: 8,
})