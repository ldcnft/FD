import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 200px;
    padding-top: 50px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px solid var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary-text);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {

    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    var whitelisted = ["0x5e3810196Ab6985af2602Ef38535E757d47C4042", "0xc41cf38cfb4ff5c1e493478e6d7669c38abd2c3a", "0x6866C1FcC94C089EA7978c377886B043eA1c8234", "0x0dbc4E7906E85156D0aB57306a31a3d21490b5F6", "0x7c0F8862b4a70b7297fc04620E9266435efffd50", "0x5C8B4fBc0212f04309bbBeb1D479B1F1B3AF62f8", "0xBFfd6e21Ba1C8Ac464D4fd301220F6472bCFC93b", "0xdc39438d56FAb57Ea8993c324a01BEc06aA56e12", "0xfF6625DFf78d998833e12ACF77bc8Db419AFB6DA", "0xe1C22727f4fdf12f335FF2F53C1A94cE76f1588c", "0x0178865d91039b03d694b627F19111274627E1A5", "0x2E0fA8F0e400466Bf29574c6c549AA05F962400a", "0x63B64D2e3411E185Fd061a269fB7239BB859022D", "0xb1505fE87A026A3710b7912e7c0B7fD3Fe82D206", "0x30fb6c20967ef5a56846163f17e1a6296b956012", "0xB963d49474b46d88D95C9004a0C8DF22346382B3", "0x538E863C797B615B621299Ab118238b85A0D38c8", "0xd4c2Dc66264fae3167E8Ef0274cB6F468957a709", "0x78185b14aCa71d958D4De7a11dE7a3215CaF7f29", "0xD9B5e8914b9DcaeD39f0c0dE1AB592cf2c4f23cE", "0xB8622Ae3897bF4fD112e9d8607030C1A8F484907", "0xB8622Ae3897bF4fD112e9d8607030C1A8F484907", "0xFCB9778F3BEb0367042f547b13e01110708e03fd", "0xE8bffd6A39389A9D6B0f64B5E7B205521680BDEE", "0xE8bffd6A39389A9D6B0f64B5E7B205521680BDEE", "0xE5DDE651328c541569dcEE1Ce5619DF74D36A44f", "0xd816C0901C3E17C84986ea7D43A2d27224E7a329", "0x90a633F3BA2950e356DD1eC3908A433C9Fba6C30", "0x0F467128ebb396079daA030d08b663A8D1edeEEa", "0x78A4E3F60d7352bdcF4b2FCBECd23323450d86c8", "0xc882285901959F898329A9754267813d3D464E4B", "0x863502553e07b662b0E7502a2232A839bE0Ace2F", "0x280D7087f158114E2da78803518Fb5068678033a", "0x0cDA1dC706F432B601168bCdBDC8483608a71d30", "0x26aFB37Fb033368056db35018904A91c5961EFBC", "0xe1ad3Ba97dd837696dD06939D7088CDFBBDF3809", "0x60cb03B643eCCACc5D4a266ED0ffCE657C8870b8", "0x303eec8237de9d147cf0959e0fb1cd64847b37da", "0xe57b3454c2594db5245395e719571bbc4f982b0a", "0x11c943e0d53531c136bd0eebd7ce348660129518", "0xde9eb4a2c7c0fb1463850a882206b090cc8f06bc", "0x5ccd379327dab51dec313ef1fdd75b3e1832b7d1", "0x149e6d252bac35b0e975c6501244cb2ba9be267a"
];

    for (var iaddress = 0; iaddress < whitelisted.length; iaddress++){
      
    if(blockchain.account = whitelisted[iaddress]) {
   
    setFeedback(`Minting your ${CONFIG.NFT_NAME} you must be whitelisted or it'll fail`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })

      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });} 

      else {
        setFeedback("Sorry, This addres is not Whitelisted .");
        setClaimingNft(false);
    } 


  };


  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
      >
        <a href={CONFIG.MARKETPLACE_LINK}>
          <StyledLogo alt={"logo"} src={"/config/logo.png"} />
        </a>
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
             
            </s.TextDescription>
            <span
              style={{
                textAlign: "center",
              }}
            >
              <StyledButton
                style={{
                  margin: "5px",
                }}
                onClick={(e) => {
                  window.open(CONFIG.MARKETPLACE_LINK, "_blank");
                }}
              >
                {CONFIG.MARKETPLACE}
              </StyledButton>
            </span>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle>
               <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>


<s.SpacerMedium />
                        
<s.Container ai={"center"} jc={"center"} fd={"row"}>
<s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 Free Max Per WL
                </s.TextDescription>
                    </s.Container>


                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "BUY"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address.
          </s.TextDescription>
          <s.SpacerSmall />
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}


export default App;
