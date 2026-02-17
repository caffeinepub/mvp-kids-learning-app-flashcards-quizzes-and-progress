import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize authorization state for role-based access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type Progress = {
    correctAnswers : Nat;
    incorrectAnswers : Nat;
    totalQuestions : Nat;
    timeOnTask : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let progressStore = Map.empty<Principal, Progress>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Progress management functions
  public shared ({ caller }) func saveProgress(progress : Progress) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save progress");
    };
    progressStore.add(caller, progress);
  };

  public query ({ caller }) func getProgress() : async Progress {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can retrieve progress");
    };
    switch (progressStore.get(caller)) {
      case (?progress) { progress };
      case (null) {
        Runtime.trap("Progress has not been stored for this user yet");
      };
    };
  };

  public query ({ caller }) func getUserProgress(user : Principal) : async Progress {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own progress");
    };
    switch (progressStore.get(user)) {
      case (?progress) { progress };
      case (null) {
        Runtime.trap("Progress has not been stored for this user yet");
      };
    };
  };
};
