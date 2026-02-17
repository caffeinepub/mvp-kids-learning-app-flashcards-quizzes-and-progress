import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface Progress {
    incorrectAnswers: bigint;
    totalQuestions: bigint;
    timeOnTask: bigint;
    correctAnswers: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProgress(): Promise<Progress>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserProgress(user: Principal): Promise<Progress>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveProgress(progress: Progress): Promise<void>;
}
