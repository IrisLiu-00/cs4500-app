import { styled, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTeams } from '../hooks/useTeams';
import { useUser } from '../hooks/useUser';

const BoldText = styled('span')`
  font-weight: bold;
`;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

export function TeamChart() {
  const { teams } = useTeams();
  const { user } = useUser();
  const [chartData, setChartData] = useState<ChartData<'bar', number[]>>({ labels: [], datasets: [] });
  useEffect(() => {
    teams &&
      setChartData({
        labels: teams?.map((team) => team.id),
        datasets: [
          {
            label: 'Team Points',
            data: teams?.map((team) => team.score),
            backgroundColor: teams?.map((team) => team.color),
          },
        ],
      });
  }, [teams]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const place = teams ? teams.findIndex((team) => team.id === user?.teamId) + 1 : undefined;
  return (
    <div>
      <Typography variant="h4">Team Ranking</Typography>
      {user && (
        <Typography variant="body1">
          Your team, <BoldText display="inline">{user?.teamId}</BoldText>, is ranked #{place}
        </Typography>
      )}
      {teams && <Bar options={options} data={chartData} redraw={true} style={{ marginTop: '20px' }} />}
    </div>
  );
}
