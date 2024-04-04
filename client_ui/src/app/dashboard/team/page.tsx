'use client';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '@/hooks/AuthContext';
import { useState } from 'react';
import Search from '@/components/searchs/search';
import NewTeamDialog from '@/components/dialogs/newTeamDialog';
import Link from 'next/link';

export default function Team() {
  const TEAM_QUERY = gql`
  query UserById($id: String!) {
    userById(id: $id) {
      teamsJoin {
        name, id, description, members {
          id, email, username
        }, 
        leader {
          id, email, username
        }
      }
      teamsOwn {
        name, id, members {
          id, email, username
        }, 
        leader {
          id, email, username
        }
      }
    }
  }`;

  const { user } = useAuth();
  const { data, loading, error, refetch } = useQuery(TEAM_QUERY, {
    variables: { id: user.id },
  });

  const [keySearch, setKeySearch] = useState('');
  return (
    <>
      <div className="flex items-start justify-between">
        <h1 className="text-xxl font-bold">Your Team</h1>
        <NewTeamDialog refetch={refetch} />
      </div>
      <Search boxClassName="text-2xl border-b-2 flex flex-row w-full mt-8 items-center"
              keySearch={keySearch} setKeySearch={setKeySearch} inputClassName="w-full"
              placeholder="Search for teams"
              iconClassname={'w-6 h-6 mr-2 text-gray-400 dark:bg-none'} />
      <div className="flex flex-col gap-4 mt-8 w-full">
        {data?.userById.teamsJoin
          .filter((team: any) => team.name.toLowerCase().includes(keySearch.toLowerCase()))
          .map((team: any) => {
            return (
              <Link href={`/dashboard/team/${team.id}`} className="flex w-full hover:shadow-md">
                <div
                  className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start w-full">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img
                      className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                      loading="lazy"
                      src="https://via.placeholder.com/150"
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <Link href={`/dashboard/team/${team.id}`} className="text-xl font-bold">{team.name}</Link>
                    <p className="text-gray-500">
                      {team.description}
                    </p>
                    <span
                      className="flex items-center justify-start text-gray-500">{`Members: ${team.members.length}`}</span>
                  </div>
                </div>
              </Link>

            );
          })}
      </div>
    </>
  );
}