export interface VoteType {
  vote: string;
  user: string;
}

export interface VoteCount {
  yes: number;
  no: number;
  veto: number;
  abstain: number;
  didNotVote: number;
}
export interface VoteState {
  data: VoteType[];
  voteCount: VoteCount;
  validatorsNotVoted: VoteType[];
  tab: number;
  proposalVote: any[];
  validatorStatuses: any[];
  dataLoading: boolean;
  isAllDataLoaded: boolean;
}

export type ItemType = VoteType;
