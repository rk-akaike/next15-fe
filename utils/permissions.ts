import permissionsData from "@/public/permissions.json";

export const permissions = permissionsData as {
  roles: Record<
    string,
    {
      description: string;
      access: string[];
    }
  >;
  features: Record<
    string,
    {
      description: string;
      dependencies: string[];
    }
  >;
};

type Role = keyof typeof permissions.roles;
type Feature = keyof typeof permissions.features;

export const getPermissionsForRole = (role: Role): string[] => {
  const rolePermissions = permissions.roles[role]?.access || [];
  const resolvedPermissions = new Set<string>();

  rolePermissions.forEach((feature) => {
    resolveDependencies(feature as Feature, resolvedPermissions);
  });

  return Array.from(resolvedPermissions);
};

const resolveDependencies = (
  feature: Feature,
  resolvedPermissions: Set<string>
) => {
  const featureData = permissions.features[feature];
  if (featureData?.dependencies) {
    featureData.dependencies.forEach((dependency) => {
      if (!resolvedPermissions.has(dependency)) {
        resolvedPermissions.add(dependency);
        resolveDependencies(dependency as Feature, resolvedPermissions);
      }
    });
  }
};
