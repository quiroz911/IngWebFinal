import React, { useEffect, useState } from 'react'
import { matchRoles } from 'utils/matchRoles';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { GET_DIAGRAM_DATA } from 'graphql/queries/employeesDiagram';
//import ReactApexChart from 'react-apexcharts';

const ReactApexChart = dynamic(() => {
  return import('react-apexcharts');

},{ssr: false});

export async function getServerSideProps(context) {
    return {
      props: { ...(await matchRoles(context)) },
    };
  }

const EmployeesDiagram = () => {
  const {data, loading} = useQuery(GET_DIAGRAM_DATA);
  const [options,setOptions] = useState({
    annotations: {
    },
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2
    },
    
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2']
      }
    },
    xaxis: {
      labels: {
        rotate: -45
      },
      categories: [],
      tickPlacement: 'on'
    },
    yaxis: {
      title: {
        text: 'Cantidad de empleados',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      },
    }
  });
  const [series,setSeries] = useState([]);

  useEffect(() => {
    if(data){
      setSeries(data.getDiagramData.series);
      setOptions({...options, xaxis: {...options.xaxis, categories: data.getDiagramData.categories}});
    }
  }, [data]);

  if(loading) return <div>Loading...</div>

  return (
    <div className='w-full flex flex-col items-center'>
        <h1>Diagrama del número de empleados por proyecto</h1>
        <div className='w-full'>
        <ReactApexChart options={options} series={series} type="bar" height={350} />    </div>
        </div>
  )
}

export default EmployeesDiagram;