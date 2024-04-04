'use client';
import { useParams } from 'next/navigation';
import { DataTable } from '@/components/tables/dataTable';
import { columns } from '@/components/tables/columns';
import { gql, useQuery } from '@apollo/client';

export default function Team() {
  const id = useParams<{ id: string }>().id;
  const TEAM_QUERY = gql`
  query teamById($id: String!){
    teamById(id: $id) {
      id, name, members {
        username, email
      }
    }
  }`;
  const { data, loading, error, refetch } = useQuery(TEAM_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  else
    return (
      <>
        <DataTable
          columns={
            columns
          }
          data={data.teamById.members} />
      </>
    );
}