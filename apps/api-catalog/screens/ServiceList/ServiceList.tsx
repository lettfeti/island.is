import React, { useState, useEffect } from 'react'
import {  Box,  
  Stack,  
  Button, 
  GridContainer, 
  GridRow, 
  GridColumn, 
  SidebarAccordion, RadioButton 
} from '@island.is/island-ui/core'

import { Layout, 
  ServiceCard,
  ServiceCardInformation, 
  CategoryCheckBox
} from '../../components'

import { getServices, 
  PRICING_CATEGORY, 
  DATA_CATEGORY, 
  TYPE_CATEGORY, 
  ACCESS_CATEGORY, 
  SERVICE_SEARCH_METHOD,
  GetServicesParameters, 
  getAllPriceCategories, 
  getAllDataCategories, 
  getAllAccessCategories, 
  getAllTypeCategories,
} from '../../components/ServiceRepository/service-repository'

import * as styles from './ServiceList.treat';
import cn from 'classnames'


export interface ServiceListProps {
  servicesList:Array<ServiceCardInformation>
  nextCursor: number
  prevCursor: number
  parameters: GetServicesParameters
}


export default function ServiceList(props:ServiceListProps) {
  
  if (!props.parameters === null) {
    props.parameters = { cursor:0, limit:null, owner:null, name:null, pricing:null, data:null, type:null, access:null, searchMethod:SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY };
  }
 
  const showNavigation = () => {
    return (
      <div className="navigation">
        <Button disabled={prevCursor === null} variant="text" onClick={() => onPageButtonClick(prevCursor)} leftIcon="arrowLeft">
          Fyrri
        </Button>
        <Button disabled={nextCursor === null} variant="text" onClick={() => onPageButtonClick(nextCursor)} icon="arrowRight">
          Næsta
        </Button>     
      </div>
    )
  }

  const selectAllCheckboxes = (selectAll:boolean) => {
    setCheckPricingFree(selectAll);
    setCheckPricingFree(selectAll);
    setCheckPricingUsage(selectAll);  
    setCheckPricingDaily(selectAll);  
    setCheckPricingMonthly(selectAll);
    setCheckPricingYearly(selectAll); 
    setCheckPricingCustom(selectAll); 
    setCheckDataPublic(selectAll);  
    setCheckDataOfficial(selectAll);  
    setCheckDataPersonal(selectAll);  
    setCheckDataHealth(selectAll);    
    setCheckDataFinancial(selectAll); 
    setCheckTypeReact(selectAll); 
    setCheckTypeSoap(selectAll);
    setCheckTypeGraphQl(selectAll);  
    setCheckAccessXRoad(selectAll);  
    setCheckAccessApiGw(selectAll);
    props.parameters.cursor  = null;
    props.parameters.pricing = selectAll? getAllPriceCategories()  : [];
    props.parameters.data    = selectAll? getAllDataCategories()   : [];
    props.parameters.type    = selectAll? getAllTypeCategories()   : [];
    props.parameters.access  = selectAll? getAllAccessCategories() : [];
  }

  const onPageButtonClick = (nextC) => {
    props.parameters.cursor = nextC;
    setParamCursor(props.parameters.cursor);
  }
  const onCheckSettingsCheckAllClick = event => {
    const selectAll = event.target.checked;
    setCheckSettingsCheckAll(selectAll);
    selectAllCheckboxes(selectAll);
  }

  const updateCategoryCheckBox = event => {
    
    const checked = event.target.checked;

    props.parameters.cursor = null;
    let filter:Array<string>;
    switch(event.target.value){
      case PRICING_CATEGORY.FREE:
      case PRICING_CATEGORY.USAGE:
      case PRICING_CATEGORY.DAILY:
      case PRICING_CATEGORY.MONTHLY:
      case PRICING_CATEGORY.YEARLY: 
      case PRICING_CATEGORY.CUSTOM: filter = props.parameters.pricing; 
                                    break;
      case DATA_CATEGORY.PUBLIC:
      case DATA_CATEGORY.OFFICIAL:
      case DATA_CATEGORY.PERSONAL:     
      case DATA_CATEGORY.HEALTH:
      case DATA_CATEGORY.FINANCIAL: filter = props.parameters.data; 
                                    break;
      case TYPE_CATEGORY.REACT:
      case TYPE_CATEGORY.SOAP:           
      case TYPE_CATEGORY.GRAPHQL:   filter = props.parameters.type; 
                                    break;
      case ACCESS_CATEGORY.X_ROAD:
      case ACCESS_CATEGORY.API_GW:  filter = props.parameters.access; 
                                    break;

      default:
        console.error('Invalid checkbox value')
        return;
    }

    if (filter === null) {
      filter = [];
    }
    if (checked) {
        if (!filter.includes(event.target.value)) {
          filter.push(event.target.value)
        }
    } else {
      filter.splice(filter.indexOf(event.target.value), 1);
    }

    
    switch(event.target.value){
      case PRICING_CATEGORY.FREE    : console.log("checkPricingFree, target.checked", checkPricingFree, checked)
                                      setCheckPricingFree(checked );   break;
      case PRICING_CATEGORY.USAGE   : setCheckPricingUsage(checked);  break;
      case PRICING_CATEGORY.DAILY   : setCheckPricingDaily(checked);  break;
      case PRICING_CATEGORY.MONTHLY : setCheckPricingMonthly(checked);break;
      case PRICING_CATEGORY.YEARLY  : setCheckPricingYearly(checked); break;
      case PRICING_CATEGORY.CUSTOM  : setCheckPricingCustom(checked); break;

      case DATA_CATEGORY.PUBLIC     : setCheckDataPublic(checked);    break;
      case DATA_CATEGORY.OFFICIAL   : setCheckDataOfficial(checked);  break;
      case DATA_CATEGORY.PERSONAL   : setCheckDataPersonal(checked);  break;
      case DATA_CATEGORY.HEALTH     : setCheckDataHealth(checked);    break;
      case DATA_CATEGORY.FINANCIAL  : setCheckDataFinancial(checked); break;

      case TYPE_CATEGORY.REACT      : setCheckTypeReact(checked);     break;
      case TYPE_CATEGORY.SOAP       : setCheckTypeSoap(checked);      break;
      case TYPE_CATEGORY.GRAPHQL    : setCheckTypeGraphQl(checked);   break;
                                      
      case ACCESS_CATEGORY.X_ROAD   : setCheckAccessXRoad(checked);   break;
      case ACCESS_CATEGORY.API_GW   : setCheckAccessApiGw(checked);   break;

    }

    switch(event.target.value) {
      case PRICING_CATEGORY.FREE    : 
      case PRICING_CATEGORY.USAGE   : 
      case PRICING_CATEGORY.DAILY   : 
      case PRICING_CATEGORY.MONTHLY : 
      case PRICING_CATEGORY.YEARLY  : 
      case PRICING_CATEGORY.CUSTOM  : setPricing(props.parameters.pricing);
                                      break;
      case DATA_CATEGORY.PUBLIC     : 
      case DATA_CATEGORY.OFFICIAL   : 
      case DATA_CATEGORY.PERSONAL   : 
      case DATA_CATEGORY.HEALTH     : 
      case DATA_CATEGORY.FINANCIAL  : setData(props.parameters.data); 
                                      break;
      case TYPE_CATEGORY.REACT      :
      case TYPE_CATEGORY.SOAP       :           
      case TYPE_CATEGORY.GRAPHQL    : setType(props.parameters.type); 
                                      break;
      case ACCESS_CATEGORY.X_ROAD   :
      case ACCESS_CATEGORY.API_GW   : setAccess(props.parameters.access); 
                                      break;
    }

    setParamCursor(props.parameters.cursor);
  }
  const [services,    setServices]   = useState<Array<ServiceCardInformation>>(props.servicesList);
  const [pricing,     setPricing]    = useState<Array<string>>(props.parameters.pricing);
  const [data,        setData]       = useState<Array<string>>(props.parameters.data);
  const [type,        setType]       = useState<Array<string>>(props.parameters.type);
  const [access,      setAccess]       = useState<Array<string>>(props.parameters.access);
  const [prevCursor,  setPrevCursor] = useState<number>(props.prevCursor);
  const [nextCursor,  setNextCursor] = useState<number>(props.nextCursor);
  const [paramCursor, setParamCursor]= useState<number>(null);
  
  //pricing
  const [checkPricingFree,    setCheckPricingFree]   = useState<boolean>(true);
  const [checkPricingUsage,   setCheckPricingUsage]  = useState<boolean>(true);
  const [checkPricingDaily,   setCheckPricingDaily]  = useState<boolean>(true);
  const [checkPricingMonthly, setCheckPricingMonthly]= useState<boolean>(true);
  const [checkPricingYearly,  setCheckPricingYearly] = useState<boolean>(true);
  const [checkPricingCustom,  setCheckPricingCustom] = useState<boolean>(true);
  //data
  const [checkDataPublic,     setCheckDataPublic]    = useState<boolean>(true);
  const [checkDataOfficial,   setCheckDataOfficial]  = useState<boolean>(true);
  const [checkDataPersonal,   setCheckDataPersonal]  = useState<boolean>(true);
  const [checkDataHealth,     setCheckDataHealth]    = useState<boolean>(true);
  const [checkDataFinancial,  setCheckDataFinancial] = useState<boolean>(true);
  //type
  const [checkTypeReact,      setCheckTypeReact]     = useState<boolean>(true);
  const [checkTypeSoap,       setCheckTypeSoap]      = useState<boolean>(true);
  const [checkTypeGraphQl,    setCheckTypeGraphQl]   = useState<boolean>(true);
  //access
  const [checkAccessApiXRoad, setCheckAccessXRoad]   = useState<boolean>(true);
  const [checkAccessApiGw,    setCheckAccessApiGw]   = useState<boolean>(true);

  //settings
  const [checkSettingsCheckAll,     setCheckSettingsCheckAll]     = useState<boolean>(false);
  const [checkSettingsSearchMethod, setCheckSettingsSearchMethod] = useState<SERVICE_SEARCH_METHOD>(SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY);
  const [radioButton, setRadioButton] = useState('0');

  useEffect(() => {
    const loadData = async () => {
      const response = await getServices(props.parameters);
      setServices(response.result);
      setPrevCursor(response.prevCursor);
      setNextCursor(response.nextCursor);
    }
      loadData();
  }, [checkPricingFree, 
      checkPricingUsage,
      checkPricingDaily,
      checkPricingMonthly,
      checkPricingYearly,
      checkPricingCustom,
      checkDataPublic,    
      checkDataOfficial,
      checkDataPersonal,
      checkDataHealth,  
      checkDataFinancial,
      checkTypeReact,     
      checkTypeSoap,      
      checkTypeGraphQl,   
      checkAccessApiXRoad,
      checkAccessApiGw,
      checkSettingsCheckAll,
      checkSettingsSearchMethod,   
      paramCursor, 
      pricing,
      data,
      type,
      access,
      props.parameters]);


  return (   
      <Layout left={
        <Box className="service-list">
          <Box marginBottom="containerGutter" marginTop={1}>
            <GridContainer>
              <GridRow className="service-items">
                <GridColumn span={9}>
                  {showNavigation()}
                  <Stack space={2}>
                    {
                      services?.map( (item, index) => {
                        return <ServiceCard key={index} service={item} />
                      })
                    }
                  </Stack>
                    {showNavigation()}
                </GridColumn>
                <GridColumn  span={3} className="filter">
                <SidebarAccordion  id="pricing_category" label="Verð">
                  <CategoryCheckBox label={PRICING_CATEGORY.FREE}    value={PRICING_CATEGORY.FREE}    checkValue={checkPricingFree}    onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={PRICING_CATEGORY.USAGE}   value={PRICING_CATEGORY.USAGE}   checkValue={checkPricingUsage}   onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={PRICING_CATEGORY.DAILY}   value={PRICING_CATEGORY.DAILY}   checkValue={checkPricingDaily}   onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={PRICING_CATEGORY.MONTHLY} value={PRICING_CATEGORY.MONTHLY} checkValue={checkPricingMonthly} onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={PRICING_CATEGORY.YEARLY}  value={PRICING_CATEGORY.YEARLY}  checkValue={checkPricingYearly}  onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={PRICING_CATEGORY.CUSTOM}  value={PRICING_CATEGORY.CUSTOM}  checkValue={checkPricingCustom}  onChange={updateCategoryCheckBox} />
                </SidebarAccordion>

                <SidebarAccordion id="data_category" label="Gögn">
                  <CategoryCheckBox label={DATA_CATEGORY.PUBLIC}    value={DATA_CATEGORY.PUBLIC}    checkValue={checkDataPublic}    onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={DATA_CATEGORY.OFFICIAL}  value={DATA_CATEGORY.OFFICIAL}  checkValue={checkDataOfficial}  onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={DATA_CATEGORY.PERSONAL}  value={DATA_CATEGORY.PERSONAL}  checkValue={checkDataPersonal}  onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={DATA_CATEGORY.HEALTH}    value={DATA_CATEGORY.HEALTH}    checkValue={checkDataHealth}    onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={DATA_CATEGORY.FINANCIAL} value={DATA_CATEGORY.FINANCIAL} checkValue={checkDataFinancial} onChange={updateCategoryCheckBox} />
                </SidebarAccordion>

                <SidebarAccordion id="type_category" label="Gerð">
                  <CategoryCheckBox label={TYPE_CATEGORY.REACT}   value={TYPE_CATEGORY.REACT}   checkValue={checkTypeReact}   onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={TYPE_CATEGORY.SOAP}    value={TYPE_CATEGORY.SOAP}    checkValue={checkTypeSoap}    onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={TYPE_CATEGORY.GRAPHQL} value={TYPE_CATEGORY.GRAPHQL} checkValue={checkTypeGraphQl} onChange={updateCategoryCheckBox} />
                </SidebarAccordion>

                <SidebarAccordion id="access_category" label="Aðgangur">
                  <CategoryCheckBox label={ACCESS_CATEGORY.X_ROAD} value={ACCESS_CATEGORY.X_ROAD}  checkValue={checkAccessApiXRoad} onChange={updateCategoryCheckBox} />
                  <CategoryCheckBox label={ACCESS_CATEGORY.API_GW} value={ACCESS_CATEGORY.API_GW}  checkValue={checkAccessApiGw}    onChange={updateCategoryCheckBox} />
                </SidebarAccordion>
                <SidebarAccordion id="filter_settings" label="Stillingar">

                <CategoryCheckBox label="Velja"   value="select-all" checkValue={checkSettingsCheckAll}     onChange={onCheckSettingsCheckAllClick}
                    tooltip="Haka í eða úr öllum gildum í öllum flokkum."/>
          <div>
            <div>Leitaraðferð</div>
          <RadioButton name="RadioButton0" id="leit-0" label="Einn" value="0"
            tooltip="Eitt gildi í einum flokk þarf að passa"
            onChange={({ target }) => {
            setRadioButton(target.value)
            props.parameters.searchMethod = target.value === '0'? SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_EACH_CATEGORY : SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY
            setCheckSettingsSearchMethod(props.parameters.searchMethod)
          }}
          checked={radioButton === '0'}
        />
        <RadioButton name="RadioButton1" id="leit-1" label="Allir" value="1"
          tooltip="Eitt gildi í hverjum flokk þarf að passa"
          onChange={({ target }) => {
            setRadioButton(target.value)
            props.parameters.searchMethod = target.value === '1'? SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_EACH_CATEGORY : SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY
            setCheckSettingsSearchMethod(props.parameters.searchMethod)
          }}
          checked={radioButton === '1'}
        />
        </div>


                  {/*
                  <CategoryCheckBox label="Leitaraðferð" value="method"     checkValue={checkSettingsSearchMethod} onChange={onCheckSettingsSearchMethodClick} 
                  tooltip="Ef valið þá þarf alla vega eitt gildi í hverjum flokk að vera eins."/>*/}

                  </SidebarAccordion>
                </GridColumn>
              </GridRow>
            </GridContainer>
          </Box>
        </Box>
      } />
  )
}

ServiceList.getInitialProps = async ():Promise<ServiceListProps> => {
  const params:GetServicesParameters = { cursor:null, 
    limit:null, 
    owner:null,
    name:null, 
    pricing:getAllPriceCategories(), 
    data:getAllDataCategories(),
    type:getAllTypeCategories(),    
    access:getAllAccessCategories(),
    searchMethod:SERVICE_SEARCH_METHOD.MUST_CONTAIN_ONE_OF_CATEGORY
  };
  
/*  const response = await getServices(params);
  const result = await response.result;
  return { parameters:params, prevCursor:response.prevCursor, nextCursor:response.nextCursor, servicesList: result };*/
  return { parameters:params, prevCursor:null, nextCursor:null, servicesList: null };
}