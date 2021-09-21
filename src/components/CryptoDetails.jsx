import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { ThunderboltOutlined, NumberOutlined, CheckOutlined, TrophyOutlined, MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined } from '@ant-design/icons'
import { useGetCryptoDetailsQuery} from './services/cryptoApi'
import Loader from './Loader';
const { Title, Text } = Typography;


const CryptoDetails = () => {
  const { coinId } = useParams();
  
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  
  const cryptoDetails = data?.data?.coin;
  if (isFetching) return <Loader/>


  const stats = [
    { title: 'Price to USD', value: `$ ${data?.data?.coin.price && millify(data?.data?.coin.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: data?.data?.coin.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${data?.data?.coin.volume && millify(data?.data?.coin.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${data?.data?.coin.marketCap && millify(data?.data?.coin.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(data?.data?.coin.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: data?.data?.coin.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: data?.data?.coin.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: data?.data?.coin.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(data?.data?.coin.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(data?.data?.coin.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detial-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
        </Title>
        <p>
          {data?.data?.coin.name} live price in US dollars.
          ViewValue Statistics,market cap and supply.
        </p>
      </Col>
   
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-detiales-heading">
              {data?.data?.coin.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {data?.data?.coin.name}
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-detials-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {data?.data?.coin.name} , such as the base and quote currency ,the rank and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {data?.data?.coin.name}?</Title>
          {HTMLReactParser(data?.data?.coin.description)}
        </Row> 
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{data?.data?.coin.name} Links</Title>
          {data?.data?.coin.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails;
