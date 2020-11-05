import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Forecast from '../components/Forecast';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Forecast />
    </Container>
  )
}
