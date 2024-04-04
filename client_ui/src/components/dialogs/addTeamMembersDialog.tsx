'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '@/hooks/AuthContext';

export default function AddTeamMembersDialog({ refetch }: { refetch?: any }) {
  const members = useRef<HTMLInputElement>(null);
  const ADD_TEAM_MEMBER = gql`
    mutation createTeam($createTeamInput: CreateTeamInput!) {
      createTeam(createTeamInput: $createTeamInput) {
        name, id, description
      }
    }
  `;
  const { user } = useAuth();

  const [createTeam, { data, loading, error }] = useMutation(ADD_TEAM_MEMBER);

  const handleSubmit = async () => {

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary hover:bg-primaryHover">Add member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Bring everyone together with one team you can @mention, filter, and assign work to
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="">
            <Label htmlFor="members" className="text-right text-sm text-gray-500">
              Invite people to your team
            </Label>
            <Input
              id="members"
              ref={members}
              className=""
              placeholder={'Enter email addresses, separated by commas'}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={handleSubmit}>Create</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
